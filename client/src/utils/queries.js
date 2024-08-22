import { gql } from '@apollo/client';

export const QUERY_SONGS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
    }
  }
`;
