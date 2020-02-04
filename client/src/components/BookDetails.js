import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

    displayBookDetails() {
        // this.props.data; // son los datos devueltos de la consulta.
        const { book } = this.props.data // ES6 sintaxis, es igual que hacer:
        // const book = this.props.data.book
        if (book) {
            return (
                <div>
                    <h2> { book.name } </h2>
                    <p> { book.genre } </p>
                    <p> { book.author.name } </p>
                    <p> All books by this author: </p>
                    <ul className="other-books">
                    {
                        book.author.books.map(book => <li key={ book.id } > { book.name } </li> )                        
                    }
                    </ul>
                </div>
            )
        }

        return (<div> No book selected... </div>)
    }

    render() {
        console.log(this.props)
        return (
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: function(props) { // cada vez que se actualizan las props, se dispara esta función, que se pasará a la query.
        return {
            variables: { // variables para la consulta
                id: props.bookIdValue
            }
        }
    }
})(BookDetails);
