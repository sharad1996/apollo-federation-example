import { ApolloServer } from "apollo-server";
import pkg from "body-parser";
import cors from "cors";
import express from "express";
import schema from "./graphql/schema.js";
import { connect } from "./mongo-db.js";
const { json } = pkg;

const corsOptions = {
  origin: ["http://localhost:4000", "http://localhost:3000"],
  credentials: true,
};

const MONGODB_URI = "mongodb://localhost:27017/federation-example";
// Start apollo server
const startApolloServer = async () => {
  const app = express();
  const port = 4001;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });
  connect(MONGODB_URI);

  app.use("/graphql", cors(corsOptions), json());

  server.listen({ port }).then(({ url }) => {
    console.log(`Server2 service ready at ${url}`);
  });
};

startApolloServer();
