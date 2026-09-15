/* eslint-disable */
import * as types from './graphql.js';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateBook($input: CreateBookInput!) {\n  createBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": typeof types.CreateBookDocument,
    "mutation DeleteBook($input: DeleteBookInput!) {\n  deleteBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": typeof types.DeleteBookDocument,
    "query GetBook($id: ID!) {\n  getBook(id: $id) {\n    id\n    title\n    pages\n  }\n}": typeof types.GetBookDocument,
    "mutation UpdateBook($input: UpdateBookInput!) {\n  updateBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": typeof types.UpdateBookDocument,
};
const documents: Documents = {
    "mutation CreateBook($input: CreateBookInput!) {\n  createBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": types.CreateBookDocument,
    "mutation DeleteBook($input: DeleteBookInput!) {\n  deleteBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": types.DeleteBookDocument,
    "query GetBook($id: ID!) {\n  getBook(id: $id) {\n    id\n    title\n    pages\n  }\n}": types.GetBookDocument,
    "mutation UpdateBook($input: UpdateBookInput!) {\n  updateBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": types.UpdateBookDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBook($input: CreateBookInput!) {\n  createBook(input: $input) {\n    id\n    title\n    pages\n  }\n}"): typeof import('./graphql.js').CreateBookDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteBook($input: DeleteBookInput!) {\n  deleteBook(input: $input) {\n    id\n    title\n    pages\n  }\n}"): typeof import('./graphql.js').DeleteBookDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBook($id: ID!) {\n  getBook(id: $id) {\n    id\n    title\n    pages\n  }\n}"): typeof import('./graphql.js').GetBookDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateBook($input: UpdateBookInput!) {\n  updateBook(input: $input) {\n    id\n    title\n    pages\n  }\n}"): typeof import('./graphql.js').UpdateBookDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
