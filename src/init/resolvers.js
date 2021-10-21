import { mutations as booksMutations } from "../bus/books/mutations";
import { queries as booksQueries } from "../bus/books/queries";
import { queries as starshipsQueries } from "../bus/starships/queries";
import { mutations as userMutations } from "../bus/users/mutations";
import { queries as userQueries } from "../bus/users/queries";
import { subscriptions as usersSubscriptions } from "../bus/users/subscriptions";

export const resolvers = {
  Query: { ...booksQueries, ...starshipsQueries, ...userQueries },
  Mutation: { ...booksMutations, ...userMutations },
  Subscription: { ...usersSubscriptions },
};
