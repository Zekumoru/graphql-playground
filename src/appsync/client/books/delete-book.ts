import type { GraphQLRequest } from '../../../graphql.types.js';
import type { AppSyncConfig } from '../../config.js';
import {
  DeleteBookDocument,
  type DeleteBookMutationVariables,
} from '../generated/graphql.js';

export function requestDeleteBook(
  config: AppSyncConfig,
  variables: DeleteBookMutationVariables,
): Promise<Response> {
  const requestBody = {
    query: DeleteBookDocument.toString(),
    variables,
  } satisfies GraphQLRequest<DeleteBookMutationVariables>;

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
