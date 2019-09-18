var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userType = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    friends: {
        type: [String]
    }
});

var userModel = mongoose.model('User', userType);

module.exports = {
    userModel
}