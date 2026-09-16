# Set up the AWS AppSync books API

This guide creates the AWS resources expected by the repository's AppSync client. It uses the AppSync console's model-backed DynamoDB flow because that is the smallest official setup for this exercise.

The resulting request path is:

```text
TypeScript client -> AppSync GraphQL endpoint -> resolver -> DynamoDB table
```

AppSync owns the GraphQL endpoint and schema. A data source identifies the DynamoDB table, an IAM service role lets AppSync access that table, and resolvers translate GraphQL fields into DynamoDB operations.

## Before starting

Use one AWS Region throughout the setup. You need an AWS identity allowed to create AppSync APIs, DynamoDB tables, IAM service roles, and API keys. If you will download the schema from the command line, install and configure the AWS CLI, then confirm which account it is using:

```sh
aws sts get-caller-identity
```

Resource names below are examples; the schema field names and types are the parts that must match the client.

## 1. Create the API and DynamoDB-backed model

1. Open the AWS AppSync console in your chosen Region and choose **Create API**.
2. Under **GraphQL APIs**, choose **Design from scratch**.
3. Give the API a name, such as `books-playground`.
4. Choose **Create type backed by a DynamoDB table now**.
5. Define a model named `Book` with these required fields:

   | Field | GraphQL type | Required |
   |---|---|:---:|
   | `id` | `ID` | Yes |
   | `title` | `String` | Yes |
   | `pages` | `Int` | Yes |

6. Give the table a name, such as `Books`, and use `id` as its primary key.
7. Review the configuration and create the API.

AppSync uses the model to generate the `Book` schema, CRUD inputs and operations, a DynamoDB table, a data source, and resolvers. The repository relies on the generated `createBook`, `getBook`, `updateBook`, and `deleteBook` fields; other generated fields may vary as the console evolves.

After creation, inspect **Schema**, **Data sources**, and the attached resolvers. The resolver on each top-level field is what turns that GraphQL operation into a DynamoDB action such as `PutItem`, `GetItem`, `UpdateItem`, or `DeleteItem`.

## 2. Verify API-key authorization

Open the API's **Settings** page and confirm that **API key** is the default authorization mode. If there is no active key, choose **Add API key** and select an appropriate expiration date.

API keys are suitable for this learning exercise, but AWS recommends them only for development or cases where exposing a public API is acceptable. They expire, can be configured for at most 365 days, and are sent by this client in the `x-api-key` header.

## 3. Test the generated resources

Open the AppSync **Queries** page and create a book:

```graphql
mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    id
    title
    pages
  }
}
```

```json
{
  "input": {
    "title": "The Clockmaker's Garden",
    "pages": 328
  }
}
```

Copy the returned `id`, then retrieve the same item:

```graphql
query GetBook($id: ID!) {
  getBook(id: $id) {
    id
    title
    pages
  }
}
```

```json
{
  "id": "RETURNED_BOOK_ID"
}
```

A successful round trip confirms that authorization, the GraphQL schema, the resolver, its IAM role, and DynamoDB are connected correctly.

## 4. Connect this repository

Copy the environment template:

```sh
cp .env.example .env
```

From the AppSync API, copy the HTTPS GraphQL endpoint and an active API key into `.env`:

```dotenv
APPSYNC_GRAPHQL_ENDPOINT=https://YOUR_API_ID.appsync-api.YOUR_AWS_REGION.amazonaws.com/graphql
APPSYNC_API_KEY=YOUR_API_KEY
```

Do not commit `.env`. Download the API's current schema, including AppSync directives, and regenerate the client types:

```sh
aws appsync get-introspection-schema \
  --api-id YOUR_API_ID \
  --format SDL \
  --include-directives \
  --region YOUR_AWS_REGION \
  src/appsync/schema.graphql

pnpm codegen
```

You can now use the AppSync commands documented in the repository [README](../README.md#aws-appsync-client).

## Cleanup

These are separate AWS resources. When the exercise is no longer needed, identify the generated names first, then delete the AppSync API, DynamoDB table, and AppSync service role. Deleting only the API does not guarantee that the table or IAM role is removed. Also remove the local API key from `.env`.

## Official references

- [Create an AppSync schema backed by DynamoDB](https://docs.aws.amazon.com/appsync/latest/devguide/schema-launch-start.html)
- [AppSync data sources](https://docs.aws.amazon.com/appsync/latest/devguide/attaching-a-data-source.html)
- [JavaScript resolvers for DynamoDB](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-dynamodb-resolvers-js.html)
- [AppSync authorization](https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html)
- [AWS CLI schema download](https://docs.aws.amazon.com/cli/latest/reference/appsync/get-introspection-schema.html)
