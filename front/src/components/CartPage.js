import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CartContainer from './CartContainer';

class CartPage extends Component {
  render() {
    return (
      <StripeProvider apiKey='pk_test_Hn6SEMXZlsowCtOeclddOv5M'>
        <Elements>
          <CartContainer />
        </Elements>
      </StripeProvider>
    );
  }
}

export default CartPage;
