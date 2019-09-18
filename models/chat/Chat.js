var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatType = new Schema({
    id: {
        type: String
    },
    msg: {
        type: String
    },
    time: {
        type: [String]
    }
});

var chatModel = mongoose.model('User', chatType);

module.exports = {
    chatModel
}