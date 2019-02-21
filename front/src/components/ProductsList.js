import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Search from './Search';
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

    let component;
    if (data.loading) {
      component = <div>Loading</div>;
    } else if (data.error) {
      component = <div>Error! ${ data.error.message }</div>;
    } else {
      component = (
        <div className="columns is-multiline is-mobile">
          { data.allProducts.map(product => (
            <ProductRow key={ product.id } product={ product }
                        refresh={ () => data.refetch() } />
          )) }
        </div>
      );
    }

    return (
      <div className='container'>
        <br />
        <Search />
        { component }
      </div>
    );
  }
}

export default graphql(UsersQuery)(ProductsList);
