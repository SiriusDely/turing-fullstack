'use strict'

class Product {
  get rules () {
    return {
      name: 'required|string:min:5',
      price: 'required|number',
      discounted_price: 'number'
    };
  }

  get sanitizationRules () {
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = Product
