export interface GraphQLRequest<TVariables> {
  query: string;
  variables: TVariables;
}

export interface GraphQLSubscriptionResolver<TPayload> {
  subscribe: () => AsyncIterable<TPayload>;
  resolve: (payload: TPayload) => TPayload;
}
