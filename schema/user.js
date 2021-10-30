var { gql } = require("apollo-server-express");

const schema = gql`
  type Query {
    getUser(id: Int): User
    getAllUsers: [User]
  }
  
  type Mutation {
    createUser(
      id: Int
      first_name: String
      last_name: String
      email: String
      gender: String
    ): User
  }

  type Subscription {
    newUser: User
  }

  type User {
    id: Int
    first_name: String
    last_name: String
    email: String
    gender: String
  }
`;

module.exports = schema;
