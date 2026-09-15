/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type CreateBookInput = {
  pages: number;
  title: string;
};

export type UpdateBookInput = {
  id: string | number;
  pages?: number | null | undefined;
  title?: string | null | undefined;
};

export type CreateBookMutationVariables = Exact<{
  input: CreateBookInput;
}>;


export type CreateBookMutation = { createBook: { id: string, title: string, pages: number } | null };

export type GetBookQueryVariables = Exact<{
  id: string | number;
}>;


export type GetBookQuery = { getBook: { id: string, title: string, pages: number } | null };

export type UpdateBookMutationVariables = Exact<{
  input: UpdateBookInput;
}>;


export type UpdateBookMutation = { updateBook: { id: string, title: string, pages: number } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateBookDocument = new TypedDocumentString(`
    mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    id
    title
    pages
  }
}
    `) as unknown as TypedDocumentString<CreateBookMutation, CreateBookMutationVariables>;
export const GetBookDocument = new TypedDocumentString(`
    query GetBook($id: ID!) {
  getBook(id: $id) {
    id
    title
    pages
  }
}
    `) as unknown as TypedDocumentString<GetBookQuery, GetBookQueryVariables>;
export const UpdateBookDocument = new TypedDocumentString(`
    mutation UpdateBook($input: UpdateBookInput!) {
  updateBook(input: $input) {
    id
    title
    pages
  }
}
    `) as unknown as TypedDocumentString<UpdateBookMutation, UpdateBookMutationVariables>;