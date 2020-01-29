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

// dummy books:
var books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Las Olas", genre: "Thriller", id: "4", authorId: "1" },
  { name: "El color de la magia", genre: "Fantasy", id: "5", authorId: "2" },
  { name: "La Gran perla dorada", genre: "Comedy", id: "6", authorId: "3" },
];

// dummy authors: 
var authors = [
    {name: 'Juan Carlos', age: 55, id: '1'},
    {name: 'Maria Chavez', age: 35, id: '2'},
    {name: 'Luis Criado', age: 40, id: '3'},
    {name: 'Mercedes Fraile', age: 70, id: '4'},
];

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
                return _.find(authors, {id: parent.authorId});
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
                return _.filter(books, {authorId: parent.id});
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
                return _.find(books, { id: args.id }); // using lodash.
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        author: {
            // name will be used from the front-end
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB or other source.
                return _.find(authors, { id: args.id }); // using lodash.
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});