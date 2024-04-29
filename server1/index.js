const { ApolloServer } = require("apollo-server");
const express = require("express");
const {
  ApolloGateway,
  RemoteGraphQLDataSource,
  LocalGraphQLDataSource,
} = require("@apollo/gateway");
const cors = require("cors");
const pkg = require("body-parser");
const { json } = pkg;
const schema = require("./src/graphql/schema");
const { connect } = require("./mongo-db");
require("dotenv").config();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

// move below variable to env
const SERVER1_URL = "http://localhost:4000";
const SERVER2_URL = "http://localhost:4001";
const MONGODB_URI = "mongodb://localhost:27017/federation-example";
async function startApolloServer() {
  const app = express();
  app.use(cors(corsOptions));
  app.use(json());
  const port = 4000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));

  const introspection = false;
  const playground = false;
  const localschema = schema;

  // Initialize Apollo Gateway with schemas
  const gateway = new ApolloGateway({
    serviceList: [
      { name: "localservice", url: SERVER1_URL },
      { name: "remoteservice", url: SERVER2_URL },
    ],
    buildService: ({ url }) => {
      if (url === SERVER1_URL) {
        return new LocalGraphQLDataSource(localschema);
      } else {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest: ({ request, context }) => {
            // Include token in the request headers
            // if (context && context.token) {
            //   request.http.headers.set("authorization", context.token);
            // }
          },
        });
      }
    },
    debug: true,
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    introspection,
    playground,
  });

  connect(MONGODB_URI);

  server.listen({ port }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}
startApolloServer();
