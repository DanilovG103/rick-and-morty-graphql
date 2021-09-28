import { gql } from '@apollo/client';

const getCharacters = gql`
  query Characters($page: Int, $name: String) {
    characters(page: $page, filter: {name: $name}) {
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
  }
`

export { getCharacters }