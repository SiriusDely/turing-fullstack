import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOGS = gql`
{
  allUsers {
    id,
      username
  }
}
`;

const Dogs = ({ onDogSelected }) => (
  <Query query={ GET_DOGS }>
    { ({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={ onDogSelected }>
          { data.allUsers.map(dog => (
            <option key={ dog.id } value={ dog.username }>
              { dog.username }
            </option>
          )) }
        </select>
      );
    } }
  </Query>
);

export default Dogs;
