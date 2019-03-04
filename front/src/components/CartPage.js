import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CartContainer from './CartContainer';

class CartPage extends Component {
  render() {
    return (
      <StripeProvider apiKey={ process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'STRIPE_PUBLISHABLE_KEY' }>
        <Elements>
          <CartContainer />
        </Elements>
      </StripeProvider>
    );
  }
}

export default CartPage;
