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
    "query GetBook($id: ID!) {\n  getBook(id: $id) {\n    id\n    title\n    pages\n  }\n}": typeof types.GetBookDocument,
};
const documents: Documents = {
    "mutation CreateBook($input: CreateBookInput!) {\n  createBook(input: $input) {\n    id\n    title\n    pages\n  }\n}": types.CreateBookDocument,
    "query GetBook($id: ID!) {\n  getBook(id: $id) {\n    id\n    title\n    pages\n  }\n}": types.GetBookDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBook($input: CreateBookInput!) {\n  createBook(input: $input) {\n    id\n    title\n    pages\n  }\n}"): typeof import('./graphql.js').CreateBookDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBook($id: ID!) {\n  getBook(id: $id) {\n    id\n    title\n    pages\n  }\n}"): typeof import('./graphql.js').GetBookDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
