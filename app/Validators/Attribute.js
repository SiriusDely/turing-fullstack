'use strict';

class Attribute {
  get rules () {
    return {
      name: 'required|string:min:4'
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = Attribute;
