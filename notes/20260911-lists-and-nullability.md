# GraphQL lists and nullability: `[]` and `!`

This reference follows each schema declaration through a query to concrete JSON responses. The examples are alternatives, not schemas to combine.

`[Book]` means a list of books. `!` disallows null for the type immediately before it: inside the brackets it applies to each book; outside it applies to the whole list.

All four examples use this object type alongside their `Query` definition:

```graphql
type Book {
  title: String!
}
```

## 1. `[Book]`: the list and its items may be null

Schema:

```graphql
type Query {
  books: [Book]
}
```

Query:

```graphql
{
  books {
    title
  }
}
```

A response can contain books mixed with null items:

```json
{
  "data": {
    "books": [
      {"title": "Dune"},
      null,
      {"title": "The Hobbit"}
    ]
  }
}
```

Or the entire list can be null:

```json
{
  "data": {
    "books": null
  }
}
```

## 2. `[Book!]`: items cannot be null; the list may be null

Schema:

```graphql
type Query {
  books: [Book!]
}
```

Query:

```graphql
{
  books {
    title
  }
}
```

When there is a list, every item must be a book:

```json
{
  "data": {
    "books": [
      {"title": "Dune"},
      {"title": "The Hobbit"}
    ]
  }
}
```

The entire list can still be null:

```json
{
  "data": {
    "books": null
  }
}
```

But `"books": [{"title": "Dune"}, null]` violates this declaration.

## 3. `[Book]!`: the list cannot be null; items may be null

Schema:

```graphql
type Query {
  books: [Book]!
}
```

Query:

```graphql
{
  books {
    title
  }
}
```

A response can contain null items inside the list:

```json
{
  "data": {
    "books": [
      {"title": "Dune"},
      null
    ]
  }
}
```

It can also contain an empty list:

```json
{
  "data": {
    "books": []
  }
}
```

But `"books": null` violates this declaration.

## 4. `[Book!]!`: neither the list nor its items may be null

Schema:

```graphql
type Query {
  books: [Book!]!
}
```

Query:

```graphql
{
  books {
    title
  }
}
```

The response contains a list with actual books:

```json
{
  "data": {
    "books": [
      {"title": "Dune"},
      {"title": "The Hobbit"}
    ]
  }
}
```

Or an empty list:

```json
{
  "data": {
    "books": []
  }
}
```

Both `"books": null` and `"books": [{"title": "Dune"}, null]` violate this declaration.

## What stays the same

The query selects `title` from every returned book. Changing only the `!` markers changes the permitted response values, not the query's field selections.

Every declaration permits `[]`. An empty list is different from a null list (`null`) and a list containing a null item (`[null]`).

The `!` in `title: String!` is a separate rule about a book's title. It does not make the book or the list non-null. If the declaration were `title: String`, a book could appear as `{"title": null}`.

## What happens when a non-null rule is violated?

GraphQL reports an execution error and replaces the nearest enclosing nullable value with null. This is often called **null bubbling**. It does not silently remove a bad item. See the specification's [execution error rules](https://spec.graphql.org/September2025/#sec-Handling-Execution-Errors).

For example, suppose the server produces a list containing a null second item. With `books: [Book!]`, the entire list becomes null:

```json
{
  "data": {
    "books": null
  },
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Query.books.",
      "path": ["books", 1]
    }
  ]
}
```

With `books: [Book!]!`, the list cannot become null either. Because `books` is a root query field here, the failure reaches the whole `data` result:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Query.books.",
      "path": ["books", 1]
    }
  ]
}
```

These are illustrative error responses; message wording and additional fields depend on the implementation. The path identifies the original failing item, using a zero-based index: `1` means the second book.

## Quick reference

| Declaration | Entire list may be null | Items may be null | Empty list allowed |
|---|---|---|---|
| `[Book]` | Yes | Yes | Yes |
| `[Book!]` | Yes | No | Yes |
| `[Book]!` | No | Yes | Yes |
| `[Book!]!` | No | No | Yes |

Official reference: [Combining List and Non-Null](https://spec.graphql.org/September2025/#sec-Combining-List-and-Non-Null).
