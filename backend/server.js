// const path = require('path');
const express = require('express');
const cors = require(`cors`);
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const port = 8080;

const app = express();

const errorMiddleware = require('./middleware/error');

// const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const githubRoutes = require('./routes/github');
const twitterRoutes = require('./routes/twitter');

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
//   next();
// });

app.use(cors());

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
// app.use("/", express.static(path.join(__dirname, "app")));

// app.use(authRoutes);
app.use(adminRoutes);
app.use(githubRoutes);
app.use(twitterRoutes);
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "app", "index.html"));
// });

app.use('/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: (err) => {
      if (!err.originalError) {
        return err;
      }
      const error = new Error(err.message || 'Unknown error occured.');
      error.data = err.originalError.data;
      error.msg = err.message || 'Unknown error occured.';
      error.status = err.originalError.code || 500;
      return error;
    }
  })
);

app.use(errorMiddleware);

const mongodb_config = require('./config').mongodb;
mongoose
  .connect(mongodb_config.uri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('Database connected...');
    app.listen(port, () => console.log('Server listening on port ' + port + '...'));
  })
  .catch(err => console.log(err));
