import React from 'react';

class ProductRow extends React.Component {
  render() {
    const { name, description, price, reducedPrice, thumbnail, image } = this.props.product;
    // console.log('product: ', this.props.product);
    return (
      <div className="column is-one-quarter">
        <div className="card">
          <div className="card-image">
            <figure className="image is-1by1">
              <img src={ `/images/products/${image}` } alt={ image } />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={ `/images/products/${thumbnail}` } alt={ thumbnail } />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{ name }</p>
                <p className="subtitle is-6">${ price }</p>
              </div>
            </div>

            <div className="content">
              { description }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;
