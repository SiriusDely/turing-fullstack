import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

const ProductQuery = gql`
  query product($id: ID){
    product(id: $id) {
      item {
        id,
        name,
        description,
        price,
        reducedPrice,
        image,
        thumbnail,
        secondImage
      },
      attributes {
        id,
        name,
        values {
          id,
          value
        }
      }
    }
  }
`;



class ProductDetails extends Component {
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
              if (!product) {
                component = <div>Loading</div>;
              } else {
                const { name, description, price, reducedPrice,
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
                                    <select>
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
                      <div className="column">
                        <button className="button is-success is-fullwidth">
                          Add to Cart
                        </button>
                      </div>
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
