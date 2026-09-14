import { requestBooks } from './client/books/find-books.js';

const response = await requestBooks({ minimum: 300 });
const result: unknown = await response.json();

console.log('HTTP status:', response.status);
console.dir(result, { depth: null });
