import "regenerator-runtime/runtime";
import { PORT } from "./init/config";
import { apolloServer, httpServer, startServer } from "./init/server";

startServer();

httpServer.listen({ port: PORT }, () => {
  console.log(
    `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
});
