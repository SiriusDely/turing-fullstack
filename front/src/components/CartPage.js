import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const CartQuery = gql`
  {
    cart {
      id,
      altId,
      attributes,
      quantity,
      orderNow,
      product {
        id,
        name,
        description,
        price,
        reducedPrice,
        thumbnail
      }
    }
  }
`;

class CartPage extends Component {
  render() {
    const data = this.props.data;
    const cart = data && data.cart;

    let component;
    if (!data || data.loading) {
      component = <div>Loading</div>;
    } else if (data && data.error) {
      component = <div>Error! ${ data.error.message }</div>;
    } else {
      let totalQuantity = 0;
      let totalAmount = 0;
      component = (
        <>
          <div className='columns is-mobile is-centered'>
            <div className='column is-1'></div>
            <div className='column is-10'>
              <p className="title is-3">Shopping Cart</p>
              <table className='table is-fullwidth'>
                <thead>
                  <tr>
                    <th colSpan={ 2 }>Item</th>
                    <th>Options</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  { cart && cart.map(item => {
                      const product = item.product;
                      const price = product.reducedPrice > 0 ? product.reducedPrice : product.price;
                      const amount = item.quantity * price;

                      totalQuantity += item.quantity;
                      totalAmount += amount;

                      return (
                        <tr key={ item.id }>
                          <td><figure className='image is-48x48'>
                            <img src={ `/images/products/${product.thumbnail}` }
                                alt={ product.thumbnail } />
                          </figure></td>
                          <td><Link to={ `/product/${product.id}` }>
                            { product.name }
                          </Link></td>
                          <td>{ item.attributes }</td>
                          <td>{ item.quantity }</td>
                          <td>${ amount.toFixed(2) }</td>
                        </tr>
                      );
                  }) }
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={ 3 }>Total</th>
                    <th>{ totalQuantity }</th>
                    <th>${ totalAmount.toFixed(2) }</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className='column is-1'></div>
          </div>
          <div class="columns">
            <div className='column is-1'></div>
            <div class='column'>
              <Link to='/' class="button is-primary is-fullwidth">
                Continue Shopping
              </Link>
            </div>
            <div class='column'>
              <button class="button is-danger is-fullwidth">Proceed to Checkout</button>
            </div>
            <div className='column is-1'></div>
          </div>
        </>
      );
    }

    return (
      <div className='container'>
        <br />
        { component }
      </div>
    );
  }
}

export default graphql(CartQuery)(CartPage);
