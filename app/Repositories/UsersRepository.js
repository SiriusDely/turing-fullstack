'use strict';

const User = use('App/Models/User');

class UsersRepository {

  async create(username, email, password) {
    return await User.create({ username, email, password });
  }

  async all() {
    return await User.all();
  }

  async find(id) {
    return await User.find(id);
  }
}

module.exports = UsersRepository;
