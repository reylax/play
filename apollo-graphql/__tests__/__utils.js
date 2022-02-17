require('dotenv').config()
const { createHttpLink  } = require('apollo-link-http');
const fetch = require('node-fetch');
const { execute, toPromise } = require('apollo-link');
const db  = require("../src/mongoose/mongo")
const Koa = require('koa');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-koa');
const typeDefs = require('../src/schema')
const resolvers = require('../src/resolvers')
const models =require('../src/mongoose/models');
const UserAPI = require('../src/dataSources/userApi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { onError }  = require("apollo-link-error");
const jwtPrivateKey = process.env.jwtPrivateKey


const dataSources = () => ({
  userApi: new UserAPI(models.User),
});

const server = new ApolloServer({ 
  context: ({ctx:{request}}) => {
    const token = request.header && request.header.authorization || '';
    var user = null;
    if (token) {
      try {
        user = jwt.verify(token, jwtPrivateKey)
      } catch(err) {
        if (err.name == 'TokenExpiredError') {
          console.log("token expired")
        } else  {
          console.log("token or privateKey error")
        }
      }
    }
    return { user: user };
  },
  typeDefs, 
  resolvers,
  dataSources,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ]
});


const startTestServer = async ({ databaseName, port }) => {
  let mongoHost = `mongodb://localhost:27017/${databaseName}`
  let option = { useNewUrlParser: true, useUnifiedTopology: true }
  db.connect(mongoHost)
  const conn = mongoose.createConnection(mongoHost, option)
  await server.start();
  const app = new Koa();
  server.applyMiddleware({ app });
  const httpServer = app.listen(port)
  return {
    httpServer,
    conn: conn,
  };
};

const setTestClient = ({ token, port }) => {
  const httpLink = createHttpLink({
    uri: `http://localhost:${port}/graphql`,
    fetch,
    headers: {
      authorization: !!token ? token : ""
    }
  });
  
  const errorLink = onError(({ networkError }) => {
      console.log(networkError.result)
    });

  const link = errorLink.concat(httpLink);
  const executeOperation = ({ query, variables = {} }) => execute(link, { query, variables })
  return executeOperation
}


module.exports = {
  startTestServer,
  setTestClient,
  toPromise,
}
