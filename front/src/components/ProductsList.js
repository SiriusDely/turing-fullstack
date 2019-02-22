import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ProductRow from './ProductRow';

const ProductsQuery = gql`
  query products($departmentId: ID, $categoryId: ID, $keyword: String){
    products(departmentId: $departmentId, categoryId: $categoryId, keyword: $keyword) {
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
    const { departmentId, categoryId, keyword } = this.props;

    return (
      <Query query={ ProductsQuery } variables={ {
        departmentId, categoryId, keyword
      } }>
      { ({ data }) => {
        let component;

        if (data && data.loading) {
          component = <div>Loading</div>;
        } else if (data && data.error) {
          component = <div>Error! ${ data.error.message }</div>;
        } else {
          component = (
            <div className="columns is-multiline is-mobile">
              { data && data.products && data.products.map(product => (
                <ProductRow key={ product.id } product={ product }
                            refresh={ () => data.refetch() } />
              )) }
            </div>
          );
        }

        return component;
      } }
      </Query>
    );
  }
}

export default ProductsList;
