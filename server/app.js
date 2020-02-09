const express = require('express');
const dotenv = require('dotenv');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
dotenv.config(); // use environment helpers.

const port = process.env.port || 4000;

// allow cross-origin requests
app.use(cors());

// connect to MongoDB Atlas.
const mongoDBUri = process.env.ATLAS_MONGODB_URI;
mongoose.connect(mongoDBUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});                  
                  
mongoose.connection.once('open', () => console.log('Connected to DB'));

// This is our middleware that will interact with the schema
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening on requests on port ${port}`);
});

