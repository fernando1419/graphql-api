import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function displayBooks(props) {
    var data = props.data;
    // console.log(data);
    
    if (data.loading) {
        return ( <div>Loading books...</div> );
    } else {
        return data.books.map(function(book){
            return (<li key={book.id} > { book.name } </li>);
        });
    }
    
}

function BookList(props) {
    return ( 
        <div>
            <ul id="book-list">
                { displayBooks(props) }
            </ul>
            <BookDetails />
        </div>
    );
}

export default graphql(getBooksQuery) (BookList);
