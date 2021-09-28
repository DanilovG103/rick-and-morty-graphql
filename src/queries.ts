import { gql } from '@apollo/client';

const getCharacters = gql`
  query Characters($page: Int) {
    characters(page: $page) {
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

const getCharactersByName = gql`
  query CharactersByName($name: String){
    characters(filter: {name: $name}) {
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


export {getCharacters, getCharactersByName}