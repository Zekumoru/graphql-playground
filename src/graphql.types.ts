export interface GraphQLRequest<TVariables> {
  query: string;
  variables: TVariables;
}
