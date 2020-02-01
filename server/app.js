const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to MongoDB Atlas.
mongoose.connect("mongodb+srv://dbMongoUser:dbMongoPassword@cluster0-axqhf.mongodb.net/test?retryWrites=true&w=majority", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});                  
                  
mongoose.connection.once('open', () => console.log('Connected to DB'));

// This is our middleware that will interact with the schema
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on requests on port 4000');
});

