import { gql } from '@apollo/client';

const getCharacters = gql`{
  characters {
    results {
      id
      name
      image
      status
      location {
        name
      }
    }
  }
}`

export {getCharacters}