const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    saveBook: async (parent, { book }, context) => {
      // Check if the user is logged in (context.user exists)
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // Find the user by their ID and add the book to their savedBooks
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { savedBooks: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return updatedUser;
    },
    // Make it so a logged in user can only remove a book from their own profile
    removeBook: async (parent, { bookId }, context) => {
      // Check if the user is logged in (context.user exists)
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // Find the user by their ID and remove the book from their savedBooks
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
