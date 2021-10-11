const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type AuthData {
    email: String!
    _id: String!
    token: String!
    expiresIn: Int!
  }

  type User {
    _id: ID!
    email: String!
    password: String
  }

  input UserInputData {
    email: String!
    password: String!
    passwordConfirmation: String
  }

  type RootQuery {
    login(userInput: UserInputData): AuthData!
  }

  type RootMutation {
    signup(userInput: UserInputData): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
