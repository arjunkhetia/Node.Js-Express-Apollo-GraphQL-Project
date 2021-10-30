var { ApolloError } = require("apollo-server-errors");
const userData = require("../MOCK_DATA.json");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const NEW_USER_EVENT = "NEW_USER_EVENT";

const resolver = {
  Query: {
    getUser: (parent, args, context) => {
      const user = userData.filter((user) => {
        if (args.id <= 0) {
          throw new ApolloError(
            "Validation: id must be greater then or equal to 1"
          );
        }
        if (args.id && args.id === user.id) {
          return user;
        }
        if (args.first_name && args.first_name === user.first_name) {
          return user;
        }
      });
      return user[0];
    },
    getAllUsers: () => {
      return userData;
    },
  },
  Mutation: {
    createUser: (parent, args, context) => {
      const user = {
        id: userData.length + 1,
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        gender: args.gender,
      };
      userData.push(user);
      pubsub.publish(NEW_USER_EVENT, { newUser: user });
      return args;
    },
  },
  Subscription: {
    newUser: {
      subscribe: () => pubsub.asyncIterator(['NEW_USER_EVENT'])
    },
  },
};

module.exports = resolver;
