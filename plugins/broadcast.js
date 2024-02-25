const {
        Alpha,
        broadcast
} = require('../lib');


Alpha({
        pattern: 'bcgroup ?(.*)',
        fromMe: true,
        desc: 'broadcast to all user in specified group',
        type: 'misc',
        onlyGroup: true
}, async (message, match) => {
if(!message.reply_message.i) return await message.send("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "group");
});

Alpha({
        pattern: 'bcall ?(.*)',
        fromMe: true,
        desc: 'broadcast to all users',
        type: 'misc'
}, async (message, match) => {
if(!message.reply_message.i) return await message.send("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "all");
});

Alpha({
        pattern: 'bcpm ?(.*)',
        fromMe: true,
        desc: 'broadcast to all your pm messages',
        type: 'misc'
}, async (message, match) => {
if(!message.reply_message.i) return await message.send("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "pm");
});

Alpha({
        pattern: 'bcongroup ?(.*)',
        fromMe: true,
        desc: 'broadcast to all groups',
        type: 'misc'
}, async (message, match) => {
if(!message.reply_message.i) return await message.send("*_please reply to a message you want to broadcast_*");
return await broadcast(message, match, "allgroup");
});
