import { requestBook } from './client/books/get-book.js';
import { loadAppSyncConfig } from './config.js';

const bookId = process.argv[2];

if (!bookId) {
  throw new Error('Missing book ID');
}

const config = loadAppSyncConfig();
const response = await requestBook(config, { id: bookId });
const result: unknown = await response.json();

console.log('HTTP status:', response.status);
console.dir(result, { depth: null });
