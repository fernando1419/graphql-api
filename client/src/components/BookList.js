import React from 'react';
import { gql } from 'apollo-boost'; // graphql parser
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

function displayBooks(props) {
    var data = props.data;
    console.log(data);
    if (data.loading) {
        return ( <div>Loading books...</div> );
    } 
    
    return data.books.map(function(book){
        return (<li key={book.id} > { book.name } </li>);
    });
}

function BookList(props) {
    return ( 
        <div>
            <ul id="book-list">
                { displayBooks(props) }
            </ul>
        </div>
    );
}

export default graphql(getBooksQuery) (BookList);
