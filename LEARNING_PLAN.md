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
- [ ] Call the API from TypeScript over HTTP and review the request lifecycle.
