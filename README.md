# GraphQL Playground

A hands-on project for learning GraphQL with TypeScript, Node.js, and GraphQL Yoga. It grows as new concepts are explored.

The [learning plan](LEARNING_PLAN.md) tracks progress, and [notes](notes/) holds explanations worth keeping.

## Getting started

With Node.js 24 and pnpm installed:

```sh
pnpm install
pnpm dev
```

Open [GraphiQL](http://127.0.0.1:4000/graphql), the browser editor for exploring the schema and running queries and mutations.

Use `pnpm start` to run the server without watching for changes. Neither command requires a build first.

To run the TypeScript client, keep the server running and use another terminal:

```sh
pnpm client
```

This regenerates the client operation types before sending a request.

## Other commands

- `pnpm codegen` — regenerate client operations and types from the GraphQL files.
- `pnpm build` — generate types, compile TypeScript, and copy schema files into `dist/`.
