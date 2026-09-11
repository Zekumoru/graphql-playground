import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

interface Book {
  title: string;
  pages: number;
}

const books: Book[] = [
  {
    title: "The Clockmaker's Garden",
    pages: 328,
  },
  {
    title: 'Echoes Beneath the Sea',
    pages: 214,
  },
];

const typeDefs = await readFile(
  new URL('./schema.graphql', import.meta.url),
  'utf-8',
);

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      books: (): Book[] => books,
    },
  },
});

const yoga = createYoga({ schema });

createServer(yoga).listen(4000, '127.0.0.1', () => {
  console.log('GraphQL: http://127.0.0.1:4000/graphql');
});
