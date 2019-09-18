var express = require('express');
var app = express();
var graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
var schema = require('./schema/schema')
 
mongoose.connect('mongodb://myChatAppUser:myChatAppPassword123@ds261567.mlab.com:61567/my-chat-app', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
})

app.use('/', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('server running at http://localhost:3000');
})