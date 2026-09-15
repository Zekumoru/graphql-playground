import { GraphQLRequest } from '../../../graphql.types.js';
import type { AppSyncConfig } from '../../config.js';
import {
  GetBookDocument,
  type GetBookQueryVariables,
} from '../generated/graphql.js';

export function requestBook(
  config: AppSyncConfig,
  variables: GetBookQueryVariables,
): Promise<Response> {
  const requestBody = {
    query: GetBookDocument.toString(),
    variables,
  } satisfies GraphQLRequest<GetBookQueryVariables>;

  return fetch(config.graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': config.apiKey,
    },
    body: JSON.stringify(requestBody),
  });
}
