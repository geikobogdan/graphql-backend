import { v4 as generateId } from "uuid";
import { booksDB } from "./db";

export const getBooks = () => {
  const books = [];
  booksDB.forEach((value, key) => {
    const currentBook = {
      id: key,
      ...value,
    };
    books.push(currentBook);
  });
  return books;
};
export const getBookById = (id) => {
  const book = booksDB.get(id);
  if (!book) {
    throw new Error(`We don't have book with id: ${id}`);
  }

  book.id = id;
  return book;
};
export const saveBook = (book) => {
  const id = generateId();
  const receiveBook = { id: book.id || id, ...book };
  booksDB.set(id, receiveBook);
  return getBookById(id);
};
export const removeBook = (id) => {
  const expectedBook = getBookById(id);
  booksDB.delete(id);
  return expectedBook;
};

export const updateBook = (id, receiveBook) => {
  const previousBook = getBookById(id);
  const expectedBook = { ...previousBook, ...receiveBook };
  removeBook(id);
  return saveBook(expectedBook);
};
