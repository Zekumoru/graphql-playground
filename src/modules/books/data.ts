import { authors } from '../authors/data.js';
import type { Book } from './models.js';

export const books: Book[] = [
  {
    title: "The Clockmaker's Garden",
    pages: 328,
    authorId: authors[0].id,
  },
  {
    title: 'Echoes Beneath the Sea',
    pages: 214,
    authorId: authors[0].id,
  },
];
