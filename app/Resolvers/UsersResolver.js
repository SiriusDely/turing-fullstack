'use strict';

// const slugify = require('slugify');

const User = use('App/Models/User');
const UsersRepo = make('App/Repositories/UsersRepository');

// Define resolvers
const UsersResolver = {
  Query: {
    // Fetch all users
    async allUsers() {
      const users = await UsersRepo.all();
      return users.toJSON();
    },
    // Get a user by its ID
    async fetchUser(_, { id }) {
      const user = await UsersRepo.find(id);
      return user.toJSON();
    }
  },

  Mutation: {
    async register(_, { username, email, password }, { auth }) {
      await User.create({ username, email, password });
      const { token } = await auth.authenticator('jwt').attempt(email, password);
      return token;
    },

    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.authenticator('jwt').attempt(email, password);
      return token;
    },

    // Create new user
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password });
    }
  }
}

module.exports = UsersResolver;
