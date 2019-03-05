import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

class GraphManager {
  constructor() {
    const httpLink = createHttpLink({
      uri: '/graphql'
    })

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem(AUTH_TOKEN);
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    this._client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }

  get client() {
    return this._client;
  }
}

export default new GraphManager();

const CartQuery = gql`
{
  cart {
    id,
    altId,
    attributes,
    quantity,
    orderNow,
    product {
      id,
      name,
      description,
      price,
      reducedPrice,
      thumbnail
    }
  }
}
`;

const CategoriesQuery = gql`
  query categories($departmentId: ID) {
    categories(departmentId: $departmentId) {
      id,
      name
    }
  }
`;

const DepartmentsQuery = gql`
  {
    departments {
      id,
      name
    }
  }
`;

const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const RegisterMutation = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password)
  }
`;

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

const AddToCart = gql`
  mutation addToCart($productId: ID!, $attributes: String!) {
    addToCart(productId: $productId, attributes: $attributes) {
      items {
        id,
        altId,
        attributes,
        quantity,
        orderNow,
        product {
          id,
          name,
          description,
          price,
          reducedPrice,
          thumbnail
        }
      }
    }
  }
`;

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

const SubmitOrder = gql`
  mutation submitOrder($source: String!) {
    submitOrder(source: $source) {
      id,
      amountTotal,
      status,
      comments,
      items {
        id,
        attributes,
        nameProduct,
        quantity,
        costUnit,
        product {
          id,
          name,
          description,
          price,
          reducedPrice,
          thumbnail
        }
      }
    }
  }
`;

export { CartQuery, CategoriesQuery, DepartmentsQuery
         , LoginMutation, RegisterMutation,
         ProductQuery, ProductsQuery,
         AddToCart, SubmitOrder };
