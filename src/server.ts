import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

interface Book {
  title: string;
  pages: number;
  authorId: string;
}

interface BookArgs {
  minPages?: number | null;
}

interface Author {
  id: string;
  name: string;
}

const authors: Author[] = [{ id: 'a1', name: 'Mira Vale' }];

const books: Book[] = [
  {
    title: "The Clockmaker's Garden",
    pages: 328,
    authorId: authors[0].id,
  },
  {
    title: 'Echoes Beneath the Sea',
    pages: 214,
    authorId: authors[0].id,
  },
];

const typeDefs = await readFile(
  new URL('./schema.graphql', import.meta.url),
  'utf-8',
);

const booksResolver = (_parent: unknown, { minPages }: BookArgs): Book[] => {
  if (minPages !== null && minPages !== undefined) {
    return books.filter((book) => book.pages >= minPages);
  }

  return books;
};

const bookAuthorResolver = (parent: Book): Author => {
  const author = authors.find((author) => author.id === parent.authorId);

  if (!author) {
    throw new Error(`Author '${parent.authorId}' not found`);
  }

  return author;
};

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      books: booksResolver,
    },
    Book: {
      author: bookAuthorResolver,
    },
  },
});

const yoga = createYoga({ schema });

createServer(yoga).listen(4000, '127.0.0.1', () => {
  console.log('GraphQL: http://127.0.0.1:4000/graphql');
});
