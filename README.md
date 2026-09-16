# GraphQL Playground

A hands-on project for learning GraphQL with TypeScript and Node.js. The main learning path uses GraphQL Yoga for a local API, with additional exercises added when they help explore another GraphQL environment, such as AWS AppSync.

The [learning plan](LEARNING_PLAN.md) tracks progress, and [notes](notes/) holds explanations worth keeping.

## Getting started

With Node.js 24 and pnpm installed:

```sh
pnpm install
pnpm dev
```

Open [GraphiQL](http://127.0.0.1:4000/graphql), the browser editor for exploring the schema and running queries, mutations, and subscriptions supported by the current API.

Use `pnpm start` to run the server without watching for changes. Neither command requires a build first.

To run the TypeScript client, keep the server running and use another terminal:

```sh
pnpm client
```

This regenerates the client operation types before sending a request.

## AWS AppSync client

The AppSync exercise has its own schema, operations, and TypeScript client under `src/appsync/`. It connects to an existing AppSync API and does not require the local Yoga server.

To provision the required AWS resources from scratch, follow the [AWS AppSync setup guide](notes/20260916-appsync-setup.md).

Copy the example environment file and fill in the endpoint and API key for your API:

```sh
cp .env.example .env
```

The local `.env` file is ignored by Git. Download or refresh the AppSync schema with the AWS CLI, replacing the API ID and region:

```sh
aws appsync get-introspection-schema \
  --api-id YOUR_API_ID \
  --format SDL \
  --include-directives \
  --region YOUR_AWS_REGION \
  src/appsync/schema.graphql
```

Run `pnpm codegen` after refreshing the schema or changing client operations.

The current client supports these command forms:

```sh
pnpm exec tsx --env-file=.env src/appsync/client.ts get <id>
pnpm exec tsx --env-file=.env src/appsync/client.ts create "<title>" <pages>
pnpm exec tsx --env-file=.env src/appsync/client.ts update <id> [--title "<title>"] [--pages <pages>]
pnpm exec tsx --env-file=.env src/appsync/client.ts delete <id>
```

## Project layout

- `src/modules/` — feature modules for the local Yoga API.
- `src/client/` — operations and client code for the local API.
- `src/appsync/` — the AppSync schema, operations, configuration, and client.
- `notes/` — durable explanations collected during the learning process.

## Other commands

- `pnpm codegen` — regenerate operation documents and types for the local and AppSync clients.
- `pnpm build` — generate types, compile TypeScript, and copy schema files into `dist/`.
