import type { GraphQLRequest } from '../../graphql.types.js';
import {
  FindBooksDocument,
  type FindBooksQueryVariables,
} from '../generated/graphql.js';

export function requestBooks(
  variables: FindBooksQueryVariables,
): Promise<Response> {
  const requestBody = {
    query: FindBooksDocument.toString(),
    variables,
  } satisfies GraphQLRequest<FindBooksQueryVariables>;

  return fetch('http://127.0.0.1:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
    },
    body: JSON.stringify(requestBody),
  });
}
