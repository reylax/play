require('dotenv').config()
const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const db = require('./mongoose/mongo')
const models = require('./mongoose/models');
const apis = require('./dataSources/index')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.jwtPrivateKey
const mongoHost = process.env.mongoHost
const PORT = process.env.PORT


const dataSources = () => ({
  userApi: new apis.UserAPI(models.USER),
  restApi: new apis.RestAPI(models.USER),
  videoApi: new apis.VideoAPI({
      commentModel: models.COMMENT, 
      videoModel: models.VIDEO,
  }),
  commentApi: new apis.CommentAPI({
    commentModel: models.COMMENT,
    userModel: models.USER,
    blogModel: models.BLOG,
    videoModel: models.VIDEO,
  }),
  blogApi: new apis.BlogAPI(models.BLOG)
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


async function startApolloServer() {
  db.connect(mongoHost)
  await server.start();
  const app = new Koa();
  server.applyMiddleware({ app });
  // alternatively you can get a composed middleware from the apollo server
  // app.use(server.getMiddleware());
  app.listen(PORT || 4000, () => {
    console.log("server started at port 4000")
  })
}

if (typeof require !== 'undefined' && require.main === module) {
  startApolloServer()
}


