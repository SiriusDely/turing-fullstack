import React, { Component } from 'react';

import axios from 'axios';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';

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

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.total = {
      quantity: 0,
      amount: 0
    };
  }

  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.stripe.createToken().then(({token}) => {
      const price = this.total.amount;
      axios.post(`https://api.stripe.com/v1/charges`,
                 {
                   source: token.id,
                   amount: price,
                   currency: 'usd'
                 },
                 {
                   headers: {
                     'Authorization': `Basic ${process.env.REACT_APP_STRIPE_API_KEY || 'STRIPE_API_KEY'}:`,
                   }
                 })
           .then(resp => {
             // this.setState({fetching: false})
             alert(`Thank you for your purchase! You card has been charged with: ${(resp.data.amount / 100).toLocaleString('en-US', {style: 'currency', currency: 'usd'})}`)
           })
           .catch(error => {
             // this.setState({fetching: false})
             console.log('error:', error)
           })
    }).catch(error => {
      // this.setState({fetching: false})
      console.log(error)
    })
  }

  render() {
    return (
      <Query query={ CartQuery }>
        { ({ data }) => {
            const cart = data && data.cart;

            let component;
            if (!data || data.loading) {
              component = <div>Loading</div>;
            } else if (data && data.error) {
              component = <div>Error! ${ data.error.message }</div>;
            } else {
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

                              this.total.quantity += item.quantity;
                              this.total.amount += amount;

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
                            <th>{ this.total.quantity }</th>
                            <th>${ this.total.amount.toFixed(2) }</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className='column is-1'></div>
                  </div>
                  <div className="columns">
                    <div className='column is-1'></div>
                    <div className='column'>
                      <Link to='/' className="button is-primary is-fullwidth">
                        Continue Shopping
                      </Link>
                    </div>
                    <div className='column is-1'></div>
                  </div>
                  <br />
                  <div className="columns">
                    <div className='column is-1'></div>
                    <div className='column'>
                      <p className="title is-3">Payment</p>
                      <CardElement />
                      <br />
                      <button className="button is-danger is-fullwidth"
                              onClick={ this.handleClick }>
                        Proceed to Checkout
                      </button>
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
        } }
      </Query>
    );
  }
}

export default injectStripe(CartContainer);
