import { requestCreateBook } from './client/books/create-book.js';
import { requestBook } from './client/books/get-book.js';
import { loadAppSyncConfig, type AppSyncConfig } from './config.js';

type CommandHandler = (
  config: AppSyncConfig,
  arguments_: (string | undefined)[],
) => Promise<Response>;

const runGetBook: CommandHandler = (config, [bookId]) => {
  if (!bookId) {
    throw new Error('Missing book ID');
  }

  return requestBook(config, { id: bookId });
};

const runCreateBook: CommandHandler = (config, [title, pagesArgument]) => {
  if (!title || !pagesArgument) {
    throw new Error('Missing title or page count');
  }

  const pages = Number(pagesArgument);
  if (!Number.isInteger(pages)) {
    throw new Error('Page count must be an integer');
  }

  return requestCreateBook(config, {
    input: {
      title,
      pages,
    },
  });
};

const commands = new Map<string, CommandHandler>([
  ['get', runGetBook],
  ['create', runCreateBook],
]);

const [commandName, ...commandArguments] = process.argv.slice(2);
const handler = commandName ? commands.get(commandName) : undefined;

if (!handler) {
  throw new Error('Usage: client.ts get <id> | create <title> <pages>');
}

const config = loadAppSyncConfig();
const response = await handler(config, commandArguments);
const result: unknown = await response.json();

console.log('HTTP status:', response.status);
console.dir(result, { depth: null });
