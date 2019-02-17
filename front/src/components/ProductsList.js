import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ProductRow from './ProductRow';

const UsersQuery = gql`
  {
    allProducts {
      id,
      name,
      price,
      reducedPrice
    }
  }
`;

class ProductsList extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          { this.props.data.allProducts.map(product => (
            <ProductRow key={ product.id } product={ product }
                        refresh={() => this.props.data.refetch() } />
          )) }
        </div>
      </div>
    );
  }
}

export default graphql(UsersQuery)(ProductsList);
