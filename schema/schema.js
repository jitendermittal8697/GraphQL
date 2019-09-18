const graphql = require('graphql');
const _ = require('lodash');

var { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList, 
    GraphQLInt
} = graphql;

var users = [
    {
        id: '1',
        name: 'Jitender Mittal',
        age: 22,
        friends: [],
        chatrooms: ['1']
    },
    {
        id: '2',
        name: 'Himanshu Mittal',
        age: 20,
        friends: ['1','3'],
        chatrooms: ['2']
    },
    {
        id: '3',
        name: 'Priyanka Mittal',
        age: 26,
        friends: ['1','2'],
        chatrooms: ['2']
    },
    {
        id: '4',
        name: 'Krishna Mittal',
        age: 45,
        friends: ['1','2','3'],
        chatrooms: ['3']
    },
    {
        id: '5',
        name: 'Suraj Mittal',
        age: 48,
        friends: ['1','2','3'],
        chatrooms: ['3']
    }
]

var chatrooms = [
    {
        id: '1',
        owner: [2,3],
        chats: [
            {sender_id: 3, msg: 'hii', timestamp: 1562217650},
            {sender_id: 3, msg: 'How Are You?', timestamp: 1562217750},
            {sender_id: 2, msg: 'Hello, I am fine', timestamp: 1562217850},
            {sender_id: 4, msg: 'Hello, I am fine', timestamp: 1562217850},
            {sender_id: 3, msg: 'Coool', timestamp: 1562217950},
        ],
        people: [3,2,4],
    },
    {
        id: '2',
        owner: [2],
        chats: [
            {sender_id: 2, msg: 'Group Created! Add more participants to chat', timestamp: 1562217850},
        ],
        people: [2],
    }
]


var chatType = new GraphQLObjectType({
    name: 'Chat',
    fields: () => ({
        sender_id: {type: GraphQLID}, 
        msg: {type: GraphQLString}, 
        timestamp: {type: GraphQLInt}
    })
});

var chatroomType = new GraphQLObjectType({
    name: 'Chatroom',
    fields: () => ({
        id: {type: GraphQLID},
        owner: {type: new GraphQLList(GraphQLID)},
        chats: {type: new GraphQLList(chatType)},
        people: {type: new GraphQLList(GraphQLID)}
    })
});

var userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        friends: {
            type: new GraphQLList(userType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.reduce(args.id || parent.friends, function (result, friendId) {
                    if(args.id) {
                        if(parent.friends.indexOf(args.id) != -1)
                            result.push(_.find(users, {id: friendId}));
                        else
                            return [];
                    }
                    else
                        result.push(_.find(users, {id: friendId}));
                    return result
                }, []);
            }
        },
        chatrooms: {
            type: new GraphQLList(chatroomType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.reduce(args.id || parent.chatrooms, function (result, chatroomId) {
                    if(args.id) {
                        if(parent.chatrooms.indexOf(args.id) != -1)
                            result.push(_.find(chatrooms, {id: chatroomId}));
                        else
                            return [];
                    }
                    else
                        result.push(_.find(chatrooms, {id: chatroomId}));
                    return result
                }, []);
            }
        }
    })
});






var rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: new GraphQLList(userType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.reduce(args.id || users, function (result, user) {
                    if(args.id) {
                        result.push(_.find(users, {id: args.id}));
                    }
                    else
                        result.push(user)
                    return result
                }, []);
            }
        },
        chatroom: {
            type: chatroomType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(chatrooms, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery
})