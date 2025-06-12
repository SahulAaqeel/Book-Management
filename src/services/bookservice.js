// services/bookservice.js

const BOOKS_KEY = 'books_data';

export const getBooks = () => {
  const stored = localStorage.getItem(BOOKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addBook = (book) => {
  const books = getBooks();
  const newBook = { ...book, _id: Date.now().toString() }; // simple ID
  const updatedBooks = [...books, newBook];
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks));
  return newBook;
};

export const getBook = (id) => {
  const books = getBooks();
  return books.find((book) => book._id === id);
};

export const updateBook = (id, updatedData) => {
  const books = getBooks();
  const updatedBooks = books.map((book) =>
    book._id === id ? { ...book, ...updatedData } : book
  );
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks));
};

export const deleteBook = (id) => {
  const books = getBooks();
  const updatedBooks = books.filter((book) => book._id !== id);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks));
};
