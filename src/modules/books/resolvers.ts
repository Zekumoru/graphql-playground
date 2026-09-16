import { GraphQLError } from 'graphql';
import { createPubSub } from 'graphql-yoga';
import { authors } from '../authors/data.js';
import type { Author } from '../authors/models.js';
import { books } from './data.js';
import type { Book } from './models.js';
import type { GraphQLSubscriptionResolver } from '../../graphql.types.js';

const pubSub = createPubSub<{
  bookAdded: [book: Book];
}>();

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
  pubSub.publish('bookAdded', book);

  return book;
};

const bookAddedResolver = {
  subscribe: () => pubSub.subscribe('bookAdded'),
  resolve: (book) => book,
} satisfies GraphQLSubscriptionResolver<Book>;

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
  Subscription: {
    bookAdded: bookAddedResolver,
  },
  Book: {
    author: bookAuthorResolver,
  },
};
