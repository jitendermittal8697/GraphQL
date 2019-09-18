var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    age: {
        type: Number
    },
    friends: {
        type: [String]
    },
    chatrooms: {
        type: [String]
    },
    chats: {
        type: [String]
    }
});

var chatType = new Schema({
    senderId: {
        type: String
    },
    msg: {
        type: String
    },
    timestamp: {
        type: Number, 
        default: (new Date()).getTime()
    }
})

var Chatrooms = new Schema({
    id:{
        type: String
    },
    owner:{
        type: [String]
    },
    chats:{
        type: [String]
    },
    people:{
        type: [String]
    }
})

var UserChats = new Schema({
    id:{
        type: String
    },
    chats: {
        type: chatType
    }
})

var GroupChats = new Schema({
    id:{
        type: String
    },
    chats: {
        type: chatType
    }
})

var UserModel = mongoose.model('User', User);
var ChatroomModel = mongoose.model('Chatroom', User);
var UserchatModel = mongoose.model('Userchat', User);
var GroupchatModel = mongoose.model('Groupchat', User);


module.exports = {
    UserModel,
    UserchatModel,
    ChatroomModel,
    GroupchatModel
}