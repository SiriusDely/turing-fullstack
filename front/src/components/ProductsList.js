import React from 'react';

import ProductRow from './ProductRow';

class ProductsList extends React.Component {
  render() {
    const { products } = this.props;

    return (
      <div className="columns is-multiline is-mobile">
        { products && products.map(product => (
          <ProductRow key={ product.id } product={ product } />
        )) }
      </div>
    );
  }
}

export default ProductsList;
