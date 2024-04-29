const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");
const { buildSubgraphSchema } = require("@apollo/federation");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

let typeDefs = [];
let resolvers = {};

/**
 * Entry point for generating all schemas from typeDefs and resolvers
 */
const fileNames = fs.readdirSync(__dirname);
for (const fileName of fileNames) {
  const filePath = path.join(__dirname, fileName);
  const isDirectory = fs.lstatSync(filePath).isDirectory();
  if (isDirectory) {
    const moduleTypeDefs = fs.readFileSync(
      path.join(filePath, "typeDefs.gql"),
      "utf8"
    );
    const moduleResolvers = require(`${filePath}/resolvers.js`);
    typeDefs.push(moduleTypeDefs); // Push moduleTypeDefs to the typeDefs array
    resolvers = merge(resolvers, moduleResolvers);
  }
}

// Merge type definitions
const mergedTypeDefs = mergeTypeDefs(typeDefs);

// Merge resolvers
const mergedResolvers = mergeResolvers(resolvers);

const schema = buildSubgraphSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

module.exports = schema;
