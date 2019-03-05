import React, { Component } from 'react';

import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { CartQuery, SubmitOrder } from '../managers/GraphManager';

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.total = {
      quantity: 0,
      amount: 0
    };
    this.state = {
      ordering: false,
      ordered: false
    };
  }

  _handleMutationError = err => {
    this.setState({
      ordering: false,
      ordered: false
    });
  }

  _handleMutationCompleted = _ => {
    this.setState({
      ordering: false,
      ordered: true
    });
  }

  _handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.stripe.createToken().then(({ token }) => {
      this.setState({
        ordering: true,
        ordered: false
      })
      this.mutation({ variables: { source: token.id } });
    }).catch(error => {
      this.setState({
        ordering: false,
        ordered: false
      })
      console.log(error)
    })
  }

  render() {
    return (
      <Query query={ CartQuery }>
        { ({ data }) => {
            // console.log('CartContainer.render.data:', data);
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
                              let attributesJson = [];
                              try {
                                attributesJson = JSON.parse(item.attributes);
                              } catch(e) {
                                // console.error(e);
                              }
                              let attributeNames = attributesJson[0] ? attributesJson[0].name : '';
                              let attributeValues = attributesJson[0] ? attributesJson[0].value.value : '';
                              for (let i=1; i < attributesJson.length; i++) {
                                const attributeJson = attributesJson[i];
                                attributeNames += '/' + attributeJson.name;
                                attributeValues += '/' + attributeJson.value.value;
                              }

                              return (
                                <tr key={ item.id }>
                                  <td><figure className='image is-48x48'>
                                    <img src={ `/images/products/${product.thumbnail}` }
                                         alt={ product.thumbnail } />
                                  </figure></td>
                                  <td><Link to={ `/product/${product.id}` }>
                                    { product.name }
                                  </Link></td>
                                  <td>{ `${attributeNames}: ${attributeValues}` }</td>
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
                    <Mutation mutation={ SubmitOrder }
                              onError={ err => this._handleMutationError(err) }
                              onCompleted={ this._handleMutationCompleted }>
                      { mutation => {
                          this.mutation = mutation;
                          return (
                            <div className='column'>
                              <p className="title is-3">Payment</p>
                              <CardElement />
                              <br />
                              <button className={ this.state.ordering ? "button is-danger is-fullwidth is-loading" : "button is-danger is-fullwidth" }
                                      disabled={ this.state.ordering || this.state.ordered }
                                      onClick={ this._handleClick }>
                                { this.state.ordered ? 'Ordered Successfully' : 'Proceed to Checkout' }
                              </button>
                            </div>
                          );
                      } }
                    </Mutation>
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
