import { createServer } from 'node:http';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import type { DocumentNode } from 'graphql';
import { createSchema, createYoga } from 'graphql-yoga';
import { bookResolvers } from './modules/books/resolvers.js';

const schemaDocuments: Array<string | DocumentNode> = await loadFiles(
  'modules/**/*.graphql',
  {
    globOptions: {
      cwd: import.meta.dirname,
    },
  },
);

const schema = createSchema({
  typeDefs: mergeTypeDefs(schemaDocuments),
  resolvers: bookResolvers,
});

const yoga = createYoga({ schema });

createServer(yoga).listen(4000, '127.0.0.1', () => {
  console.log('GraphQL: http://127.0.0.1:4000/graphql');
});
