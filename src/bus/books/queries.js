import { ApolloServer } from "apollo-server-express";
import { getBookById, getBooks } from "./model";

export const queries = {
  books: () => getBooks(),
  book: (_, { id }) => {
    try {
      return getBookById(id);
    } catch ({ message }) {
      throw new ApolloServer(message);
    }
  },
};
