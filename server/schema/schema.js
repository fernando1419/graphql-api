const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // console.log(parent);
                // return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id});
            }            
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            // name will be used from the front-end
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB or other source.
                // return _.find(books, { id: args.id }); // using lodash.
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
            }
        },
        author: {
            // name will be used from the front-end
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB or other source.
                // return _.find(authors, { id: args.id }); // using lodash.
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});