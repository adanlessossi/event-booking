const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());
app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongocluster-wufx9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
  { useNewUrlParser: true })
    .then(() => {
      app.listen(3000);
      console.log('Connection to Atlas Successful!');
    })
    .catch(err => {
      console.log(err);
  }
);
