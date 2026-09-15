import type { GraphQLRequest } from '../../../graphql.types.js';
import type { AppSyncConfig } from '../../config.js';
import {
  CreateBookDocument,
  type CreateBookMutationVariables,
} from '../generated/graphql.js';

export function requestCreateBook(
  config: AppSyncConfig,
  variables: CreateBookMutationVariables,
): Promise<Response> {
  const requestBody = {
    query: CreateBookDocument.toString(),
    variables,
  } satisfies GraphQLRequest<CreateBookMutationVariables>;

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
