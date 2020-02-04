import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
    
    displayBooks() {
        var data = this.props.data;
        // console.log(data);
        // console.log(this.state.selected)
    
        if (data.loading) {
            return ( <div>Loading books...</div> );
        } 
        
        return data.books.map((book) => {
            return (
                <li key={book.id} onClick={ (e) => this.setState({ selected: book.id }) } > { book.name } </li>
            );
        });        
    }
   
    render() {
        // console.log(this.state.selected)
        return ( 
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetails bookIdValue={ this.state.selected } />                
            </div>
        );
    }
}

export default graphql(getBooksQuery) (BookList);
