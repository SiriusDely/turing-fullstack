import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ProductRow from './ProductRow';

const UsersQuery = gql`
  {
    allProducts {
      id,
      name,
      description,
      price,
      reducedPrice,
      image,
      thumbnail,
      secondImage
    }
  }
`;

class ProductsList extends React.Component {
  render() {
    const { data } = this.props;
    console.log('data:', this.props.data);

    if (data.loading) {
      return (<div>Loading</div>)
    } else if (data.error) {
      return (<div>Error! ${ data.error.message }</div>)
    }

    return (
      <section class="section">
        <div class="columns is-multiline is-mobile">
          { data.allProducts.map(product => (
            <ProductRow key={ product.id } product={ product }
                        refresh={ () => data.refetch() } />
          )) }
        </div>
      </section>
    );
  }
}

export default graphql(UsersQuery)(ProductsList);
