import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Pagination from './Pagination';
import ProductsList from './ProductsList';

const ProductsQuery = gql`
  query products($departmentId: ID, $categoryId: ID, $keyword: String, $page: Int){
    products(departmentId: $departmentId, categoryId: $categoryId, keyword: $keyword, page: $page) {
      data {
        id,
        name,
        description,
        price,
        reducedPrice,
        image,
        thumbnail,
        secondImage
      },
      total,
      page,
      perPage,
      lastPage
    }
  }
`;

class ProductsContainer extends React.Component {
  state = { pageVar: 1 };

  _handlePaginationClick = pageVar => {
    const page = parseInt(pageVar);
    if (page > 0) { this.setState({ pageVar: page }); }
  }

  render() {
    const { departmentId, categoryId, keyword } = this.props;
    const { pageVar } = this.state;

    return (
      <Query query={ ProductsQuery } variables={ {
          departmentId, categoryId, keyword, page: pageVar
      } }>
      { ({ data }) => {
        const products = data.products;
        const { page, lastPage } = products ? products : {};

        let component;
        if (data && data.loading) {
          component = <div>Loading</div>;
        } else if (data && data.error) {
          component = <div>Error! ${ data.error.message }</div>;
        } else {
          component = (
            <>
              <Pagination page={ page } lastPage={ lastPage } onClick={ this._handlePaginationClick } />
              <br />
              <div className="columns is-multiline is-mobile">
                { products && data.products.data &&
                  <ProductsList products={ data.products.data } />
                }
              </div>
              <Pagination page={ page } lastPage={ lastPage } onClick={ this._handlePaginationClick } />
            </>
          );
        }

        return component;
      } }
      </Query>
    );
  }
}

export default ProductsContainer;
