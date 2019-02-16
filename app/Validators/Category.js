'use strict'

class Category {
  get rules () {
    return {
      name: 'required|string:min:5',
      department_id: 'required:integer'
    }
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = Category
