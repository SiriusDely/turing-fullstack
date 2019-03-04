import React, { Component } from 'react';

import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';

import { ProductQuery, AddToCart } from '../managers/GraphManager';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.attributes = [];
    this.state = {
      addingToCart: false,
      addedToCart: false
    };
  }

  _handleChange = e => {
    const index = e.nativeEvent.target.selectedIndex;
    const value = e.nativeEvent.target[index].text;
    for (let attribute of this.attributes) {
      if (attribute.name === e.target.name) {
        attribute.value = {
          id: e.target.value,
          value
        }
      }
    }
  }

  _handleMutationError = err => {
    this.setState({
      addingToCart: false,
      addedToCart: false
    });
  }

  _handleMutationCompleted = _ => {
    this.setState({
      addingToCart: false,
      addedToCart: true
    });
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <Query query={ ProductQuery } variables={ { id } }>
        { ({ data }) => {
            let component;
            if (data && data.loading) {
              component = <div>Loading</div>;
            } else if (data && data.error) {
              component = <div>Error! ${ data.error.message }</div>;
            } else {
              const productDetails = data && data.product;
              const product = productDetails && productDetails.item;
              const attributes = productDetails && productDetails.attributes;

              if (attributes) {
                const defaultAttributes = [];
                for (let attribute of attributes) {
                  const defaultAttribute = {
                    id: attribute.id,
                    name: attribute.name
                  };
                  defaultAttribute.value = {
                    id: attribute.values[0].id,
                    value: attribute.values[0].value
                  };
                  defaultAttributes.push(defaultAttribute);
                }
                this.attributes = defaultAttributes;
              }

              if (!product) {
                component = <div>Loading</div>;
              } else {
                const { id, name, description, price, reducedPrice,
                        image, secondImage } = product ? product : null;

                let priceComponent;
                if (reducedPrice && reducedPrice > 0) {
                  priceComponent = <p className="content is-large">
                    Price: <span style={ { textDecoration: 'line-through' } }>${ price }</span> ${ reducedPrice.toFixed(2) }
                  </p>
                } else {
                  priceComponent = <p className="content is-large">Price: ${ price }</p>
                }

                component = (
                  <div className='container'>
                    <br />
                    <p className="title is-3">{ name }</p>
                    <div className="columns">
                      <div className="column is-one-third">
                        <figure className="image">
                          <img src={ `/images/products/${image}` } alt={ image } />
                        </figure>
                      </div>
                      <div className="column">
                        <p className="content is-medium">{ description }</p>
                        { priceComponent }
                        { attributes.map(attribute => (
                          <div key={ attribute.id } className="field is-horizontal">
                            <div className="field-label is-normal">
                              <label className="label">{ attribute.name }</label>
                            </div>
                            <div className="field-body">
                              <div className="field">
                                <div className="control">
                                  <div className="select">
                                    <select name={ attribute.name }
                                            onChange={ this._handleChange }>
                                      { attribute.values.map(value => (
                                        <option key={ value.id } value={ value.id }>
                                          { value.value }
                                        </option>
                                      )) }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )) }
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column is-one-third">
                        <figure className="image">
                          <img src={ `/images/products/${secondImage}` } alt={ secondImage } />
                        </figure>
                      </div>
                      <Mutation mutation={ AddToCart }
                                onError={ err => this._handleMutationError(err) }
                                onCompleted={ this._handleMutationCompleted }>
                        { mutation => (
                          <div className="column">
                            <button className={ this.state.addingToCart ? "button is-success is-fullwidth is-loading" : "button is-success is-fullwidth" }
                                    disabled={ this.state.addingToCart || this.state.addedToCart }
                                    onClick={ e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.setState({
                                          addingToCart: true,
                                          addedToCart: false
                                        });
                                        mutation({ variables: {
                                          productId: id,
                                          attributes: JSON.stringify(this.attributes)
                                        } });
                                    } }>
                              { this.state.addedToCart ? 'Added to Cart' : 'Add To Cart' }
                            </button>
                          </div>
                        ) }
                      </Mutation>
                    </div>
                  </div>
                );
              }
            }
            return component;
        } }
      </Query>
    );
  }
}

export default withRouter(ProductDetails);
