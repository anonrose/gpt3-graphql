const app = require('express')();
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchema } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');
const resolvers = require('./src/graphql/resolvers');
const OpenAI = require('openai-api');
const PORT = process.env.PORT || 3000;

dotenv.config();

const key = process.env.OPENAI_API_KEY;


(async () => {
  const schema = await loadSchema('./src/graphql/types/*.graphql', { // load from multiple files using glob
    loaders: [
      new GraphQLFileLoader()
    ]
  });

  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

  app.use('/graphql', (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    const [_, access_token] = bearerHeader ? bearerHeader.split(' ') : [null, key];

    if (access_token) {
      req.openai = new OpenAI(access_token);
    } else {
      return res.status(403).send(`authorization denied: neither Authorization header set nor OPENAI_API_KEY env var not set, one of these must be set to access the API`);
    }
    next();
  });

  app.use('/graphql', graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: !!process.env.SHOW_GRAPHIQL
  }));


  app.listen(PORT, () => {
    console.info(`Listening on ${PORT}`);
  });
})()