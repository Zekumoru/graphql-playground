# GraphQL Learning Plan

Work through one hands-on step at a time: explain, implement, review, then continue. Check off completed items together and adjust the path as we learn.

Use TypeScript, Node.js, pnpm, and VSCode, with tsx running the source and GraphQL Yoga serving the API through Node's built-in HTTP listener. Organize the source into feature modules, keeping each feature's schema, resolvers, and data models together. Keep material decisions user-led.

- [x] Understand schemas, queries, and how selected fields shape a response.
- [x] Write a first query and explore a schema.
- [x] Practice arguments, variables, and named operations.
  - [x] Cover their syntax and roles.
  - [x] Implement and verify optional field arguments.
  - [x] Run a named operation with variables.
- [x] Define schema types: scalars, objects, lists, and nullability.
- [x] Understand how resolvers supply field values.
- [x] Build the first GraphQL API in TypeScript.
  - [x] Choose the stack and layout; initialize the package and install dependencies.
  - [x] Configure TypeScript compilation.
  - [x] Write and validate the books schema.
  - [x] Implement the books query resolver.
  - [x] Run and verify the Yoga endpoint.
- [x] Resolve nested fields and explore relationships between types.
  - [x] Implement and review the book-to-author resolver.
  - [x] Verify a nested query against the endpoint.
- [x] Organize feature modules and automate schema discovery, merging, and build assets.
- [x] Practice aliases and reusable fragments.
- [x] Add a mutation using input types.
  - [x] Define and review the mutation field and input object.
  - [x] Implement the resolver and verify creation through the API.
- [x] Explore validation errors, resolver errors, and partial responses.
  - [x] Verify schema validation rejects invalid input before execution.
  - [x] Observe resolver errors and non-null propagation.
  - [x] Explain partial responses and nullable boundaries through examples.
- [x] Organize client operations in colocated `.graphql` files and generate TypeScript types with GraphQL Code Generator.
  - [x] Install the generation CLI.
  - [x] Configure operation discovery and generate client types.
  - [x] Use generated operations in the client and regenerate before running or building.
- [x] Call the API from TypeScript over HTTP and review the request lifecycle.
- [x] Implement and verify a GraphQL subscription with Yoga.
  - [x] Define `Subscription.bookAdded` with a typed in-memory Pub/Sub topic.
  - [x] Publish from `addBook` and receive the event over SSE in GraphiQL.

## Official documentation reading

Read the [official GraphQL learning guide](https://graphql.org/learn/introduction/), discussing unclear concepts as they arise.

- [x] Introduction
- [x] Schemas and Types
- [x] Queries
- [x] Mutations
- [x] Subscriptions
- [x] Validation
- [x] Execution
- [x] Response
- [ ] Introspection

## AWS AppSync basics

A focused hands-on session of roughly one hour using the existing AWS account in `eu-central-1`. Build a small books API in the AWS console, with DynamoDB, JavaScript resolvers, and API-key authentication.

- [x] Understand AppSync's role and how it differs from our Yoga server.
- [x] Discuss the proposed setup and settle the service and authentication choices.
- [x] Create the GraphQL API, books schema, and data source.
- [x] Understand the generated resolvers for creating and retrieving books.
  - [x] Inspect the generated create resolver and its request/response handlers.
  - [x] Inspect the generated read resolver.
- [x] Test a mutation, a query, and an invalid request in the console.
  - [x] Create a book and verify the returned ID and fields.
  - [x] Retrieve the stored book in a separate query.
  - [x] Test an invalid request.
- [x] Review the request flow.
- [x] Connect the repository's TypeScript client to the AppSync API.
  - [x] Configure the endpoint and API key without committing credentials.
  - [x] Generate types for the AppSync schema and send a request from the client.
  - [x] Verify the response against the DynamoDB-backed API.
- [x] Complete the CRUD lifecycle through the AppSync TypeScript client.
  - [x] Create a book.
  - [x] Update the created book.
  - [x] Delete the created book.
- [ ] Clean up the exercise resources.
