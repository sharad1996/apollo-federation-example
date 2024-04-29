import mongoose from "mongoose";

async function connect(uri, options) {
  if (uri) {
    console.log("Connecting to the database on URI: ", uri);
    const mongooseConnection = await mongoose.connect(uri, options);
    return mongooseConnection;
  }
  throw new Error("URI is required to connect to the database");
}

export { connect };
