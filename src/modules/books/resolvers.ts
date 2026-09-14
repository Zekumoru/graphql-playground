import { authors } from '../authors/data.js';
import type { Author } from '../authors/models.js';
import { books } from './data.js';
import type { Book } from './models.js';
import { GraphQLError } from 'graphql';

interface BookArgs {
  minPages?: number | null;
}

interface AddBookArgs {
  input: {
    title: string;
    pages: number;
    authorId: string;
  };
}

const booksResolver = (_parent: unknown, { minPages }: BookArgs): Book[] => {
  if (minPages !== null && minPages !== undefined) {
    return books.filter((book) => book.pages >= minPages);
  }

  return books;
};

const addBookResolver = (_parent: unknown, { input }: AddBookArgs): Book => {
  const author = authors.find((author) => author.id === input.authorId);

  if (!author) {
    throw new GraphQLError(`Author '${input.authorId}' not found`);
  }

  const book: Book = { ...input };
  books.push(book);

  return book;
};

const bookAuthorResolver = (parent: Book): Author => {
  const author = authors.find((author) => author.id === parent.authorId);

  if (!author) {
    throw new GraphQLError(`Author '${parent.authorId}' not found`);
  }

  return author;
};

export const bookResolvers = {
  Query: {
    books: booksResolver,
  },
  Mutation: {
    addBook: addBookResolver,
  },
  Book: {
    author: bookAuthorResolver,
  },
};
