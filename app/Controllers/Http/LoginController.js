'use strict';

const Customer = use('App/Models/Customer');
const Env = use('Env');

class LoginController {

  async redirectFB({ ally }) {
    await ally.driver('facebook').redirect();
  }

  async callbackFB({ ally, auth, response }) {
    try {
      const fbUser = await ally.driver('facebook').getUser();

      const customerData = {
        name: fbUser.getName(),
        email: fbUser.getEmail(),
        password: fbUser.getId(),
        // token: fbUser.getAccessToken(),
        // login_source: 'facebook',
        shipping_region_id: 4
      };
      // console.log('customerData:', customerData);

      const whereClause = {
        email: fbUser.getEmail()
      }

      const customer = await Customer.findOrCreate(whereClause, customerData);
      const { token } = await auth.authenticator('customer').generate(customer);
      // console.log('token:', token);

      response.redirect(`${Env.get('CLIENT_URL', '')}/authenticated?token=${token}`);
    } catch (error) {
      console.error(error);
      return 'Unable to authenticate. Try again later.';
    }
  }
}

module.exports = LoginController;
