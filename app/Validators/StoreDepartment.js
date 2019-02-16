'use strict'

class StoreDepartment {
  get rules () {
    return {
      // validation rules
      name: 'required|string:min:5'
    }
  }

  get sanitizationRules () {
    // sanitize data before validation
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = StoreDepartment;
