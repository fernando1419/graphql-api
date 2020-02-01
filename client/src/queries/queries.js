import { gql } from 'apollo-boost'; // graphql parser

const getBooksQuery = gql `
    {
        books {
            name
            id
        }
    }
`
const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

export { getBooksQuery, getAuthorsQuery };