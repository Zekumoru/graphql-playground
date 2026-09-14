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
    "query FindBooks($minimum: Int) {\n  books(minPages: $minimum) {\n    title\n    pages\n    author {\n      name\n    }\n  }\n}": typeof types.FindBooksDocument,
};
const documents: Documents = {
    "query FindBooks($minimum: Int) {\n  books(minPages: $minimum) {\n    title\n    pages\n    author {\n      name\n    }\n  }\n}": types.FindBooksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindBooks($minimum: Int) {\n  books(minPages: $minimum) {\n    title\n    pages\n    author {\n      name\n    }\n  }\n}"): typeof import('./graphql.js').FindBooksDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
