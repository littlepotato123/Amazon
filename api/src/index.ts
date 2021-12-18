import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { AuthenticationResolver } from "./resolvers/Authentication";
import { ItemResolver } from "./resolvers/ItemResolver";
import { Setup } from "./resolvers/Setup";

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthenticationResolver, Setup, ItemResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("http://localhost:4000/graphql");
  });
})();
