export interface AppSyncConfig {
  graphqlEndpoint: URL;
  apiKey: string;
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function loadAppSyncConfig(): AppSyncConfig {
  const graphqlEndpoint = new URL(
    requiredEnvironmentVariable('APPSYNC_GRAPHQL_ENDPOINT'),
  );

  if (
    graphqlEndpoint.protocol !== 'https:' ||
    graphqlEndpoint.pathname !== '/graphql'
  ) {
    throw new Error('Invalid AppSync GraphQL endpoint');
  }

  return {
    graphqlEndpoint,
    apiKey: requiredEnvironmentVariable('APPSYNC_API_KEY'),
  };
}
