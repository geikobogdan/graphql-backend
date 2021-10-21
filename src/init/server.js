import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

import cors from "cors";
import { schema } from "./types.graphql";
import { resolvers } from "./resolvers";
import { api as starshipsAPI } from "../bus/starships/dataSource";
import { corsOptions, sessionOptions } from "./config";
import session from "express-session";
import { readToken } from "./readToken";

const app = express();

app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(readToken);

const httpServer = createServer(app);

// ...

let apolloServer = null;
export async function startServer() {
  const mainSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema: mainSchema,
      // These are imported from `graphql`.
      execute,
      subscribe,
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: apolloServer.graphqlPath,
    }
  );

  apolloServer = new ApolloServer({
    schema: mainSchema,
    credentials: "include",
    dataSources: () => ({ starshipsAPI }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: "/",
    cors: false, // disables the apollo-server-express cors to allow the cors middleware use
  });
}
export { app, httpServer, apolloServer };
