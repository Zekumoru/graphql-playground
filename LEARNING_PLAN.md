# GraphQL Learning Plan

Work through one hands-on step at a time: explain, implement, review, then continue. Check off completed items together and adjust the path as we learn.

Use TypeScript, Node.js, pnpm, and VSCode, with tsx running the source and GraphQL Yoga serving the API through Node's built-in HTTP listener. Keep material decisions user-led.

- [x] Understand schemas, queries, and how selected fields shape a response.
- [x] Write a first query and explore a schema.
- [ ] Practice arguments, variables, and named operations.
  - [x] Cover their syntax and roles.
  - [ ] Implement and verify optional field arguments.
  - [ ] Run a named operation with variables.
- [x] Define schema types: scalars, objects, lists, and nullability.
- [x] Understand how resolvers supply field values.
- [x] Build the first GraphQL API in TypeScript.
  - [x] Choose the stack and layout; initialize the package and install dependencies.
  - [x] Configure TypeScript compilation.
  - [x] Write and validate the books schema.
  - [x] Implement the books query resolver.
  - [x] Run and verify the Yoga endpoint.
- [ ] Resolve nested fields and explore relationships between types.
- [ ] Practice aliases and reusable fragments.
- [ ] Add a mutation using input types.
- [ ] Explore validation errors, resolver errors, and partial responses.
- [ ] Call the API from TypeScript over HTTP and review the request lifecycle.
