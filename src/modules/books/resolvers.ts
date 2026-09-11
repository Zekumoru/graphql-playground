import { authors } from '../authors/data.js';
import type { Author } from '../authors/models.js';
import { books } from './data.js';
import type { Book } from './models.js';

interface BookArgs {
  minPages?: number | null;
}

const booksResolver = (_parent: unknown, { minPages }: BookArgs): Book[] => {
  if (minPages !== null && minPages !== undefined) {
    return books.filter((book) => book.pages >= minPages);
  }

  return books;
};

const bookAuthorResolver = (parent: Book): Author => {
  const author = authors.find((author) => author.id === parent.authorId);

  if (!author) {
    throw new Error(`Author '${parent.authorId}' not found`);
  }

  return author;
};

export const bookResolvers = {
  Query: {
    books: booksResolver,
  },
  Book: {
    author: bookAuthorResolver,
  },
};
