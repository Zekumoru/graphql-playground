import type { GraphQLRequest } from '../../../graphql.types.js';
import type { AppSyncConfig } from '../../config.js';
import {
  UpdateBookDocument,
  type UpdateBookMutationVariables,
} from '../generated/graphql.js';

export function requestUpdateBook(
  config: AppSyncConfig,
  variables: UpdateBookMutationVariables,
): Promise<Response> {
  const requestBody = {
    query: UpdateBookDocument.toString(),
    variables,
  } satisfies GraphQLRequest<UpdateBookMutationVariables>;

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
