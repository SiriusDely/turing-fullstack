'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY || 'STRIPE_API_KEY');

class StripeProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Turing/Stripe', () => {
      return stripe;
    });
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
  }
}

module.exports = StripeProvider;
