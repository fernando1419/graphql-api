import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors() {
        // console.log(this.props);
        var data = this.props.getAuthorsQueryExample;
        
        if (data.loading) {
            return (<option disabled> Loading authors... </option>);
        }

        return data.authors.map(author => {
            return (<option key={ author.id } value={ author.id }> { author.name } </option>);
        });        
    }

    submitForm(e) {
        e.preventDefault();
        // console.log(this.state);
        this.props.addBookMutationExample({
            variables: { // si no uso variables, dá error.
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }] // updates the bookList after inserting a book (re-renders the component).
        });
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)} >
                <div className="field">
                    <label>Book Name:</label> 
                    <input type="text" onChange={ (e) => this.setState({name: e.target.value }) } required />
                </div>  
                <div className="field">
                    <label>Genre:</label> 
                    <input type="text" onChange={ (e) => this.setState({genre: e.target.value }) } required />
                </div>  
                <div className="field">
                    <label>Author:</label> 
                    <select onChange={ (e) => this.setState({authorId: e.target.value }) } > 
                        <option> Select author </option> 
                        { this.displayAuthors() }
                    </select>
                </div>  
                <button>+</button>
            </form>                
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQueryExample"}),
    graphql(addBookMutation, {name: "addBookMutationExample"})
)(AddBook);
