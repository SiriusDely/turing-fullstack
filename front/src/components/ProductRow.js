import React from 'react';

class ProductRow extends React.Component {
  render() {
    const { name, description, price, reducedPrice, thumbnail, image } = this.props.product;
    console.log('product: ', this.props.product);
    return (
      <div class="column is-one-quarter">
        <div class="card">
          <div class="card-image">
            <figure class="image is-1by1">
              <img src={ `/images/products/${image}` } alt={ image } />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src={ `/images/products/${thumbnail}` } alt={ thumbnail } />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{ name }</p>
                <p class="subtitle is-6">${ price }</p>
              </div>
            </div>

            <div class="content">
              { description }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;
