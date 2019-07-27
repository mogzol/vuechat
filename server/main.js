const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 3000;

let curId = 1;
const users = {};
const rooms = {};

app.get('/', (req, res) => res.send('Hello World!'))

function addMessage(room, username, message) {
    const timestamp = Date.now();
    const messageData = { username, message, timestamp };
    room.messages.push(messageData);

    // Rooms only hold a max of 256 messages. Trim the oldest
    if (room.messages.length > 256) {
        const toRemove = room.messages.length - 256;
        room.messages.splice(0, toRemove);
    }
}

function updateRoom(room) {
    // This is pretty inefficient since we are sending the entire room state on every update,
    // but I made this project to get more familiar with Vue, so I don't really care about the
    // server implementation

    // Rooms only hold a max of 256 messages. Trim the oldest
    if (room.messages.length > 256) {
        const toRemove = room.messages.length - 256;
        room.messages.splice(0, toRemove);
    }

    const roomData = {
        name: room.roomName,
        users: room.users.map(user => user.username),
        messages: room.messages,
    };

    for (const [username, user] of Object.entries(room.users)) {
        user.ws.send(JSON.stringify({ type: 'room', data: roomData }));
    }
}

app.ws('/connect', (ws, req) => {
    ws.on('message', msg => {
        msg = JSON.parse(msg);

        // Handle initial connection
        if (msg.type === 'init' && ws._username === undefined) {
            const username = msg.username;
            if (typeof username !== 'string' || username.length > 20 || username.length < 3) {
                ws.send(JSON.stringify({ type: 'error', message: 'Username invalid (max length: 20, min length: 3)' }));
                return;
            }

            if (users[username] !== undefined) {
                ws.send(JSON.stringify({ type: 'error', message: 'Username already taken' }));
                return;
            }

            users[username] = {
                username: username,
                ws: ws,
                room: null,
            }
            ws._username = username;
            ws.send(JSON.stringify({ type: 'login', username: username }));
            return;
        }

        // First we get the user for this websocket
        const thisUser = users[ws._username];
        if (thisUser === undefined) {
            ws.close(1, 'Unknown client');
            return;
        }

        // Then handle the message
        switch (msg.type) {
            case 'join': {
                const roomName = msg.room;
                if (typeof roomName !== 'string' || roomName.length > 20 || roomName.length < 3) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid room (max length: 20, min length: 3)' }));
                    return;
                }

                if (!rooms[roomName]) {
                    rooms[roomName] = { roomName: roomName, users: [], messages: [] };
                }

                const room = rooms[roomName];

                if (room.users[thisUser.username]) {
                    ws.send(JSON.stringify({ type: 'error', message: 'You are already in this room' }));
                    return;
                }

                // Remove the user from thier current room
                if (thisUser.room !== null && rooms[thisUser.room] !== undefined) {
                    delete rooms[thisUser.room].users[thisUser.username];
                    updateRoom(rooms[thisUser.room]);
                }

                // Add the user to this room
                room.users[thisUser.username] = thisUser;
                thisUser.room = roomName;

                // Add an update message
                addMessage(room, null, `${thisUser.username} has joined the room`);
                updateRoom(room);

                return;
            }
            case 'message': {
                const room = rooms[thisUser.room];
                if (room === undefined) {
                    ws.send(JSON.stringify({ type: 'error', message: 'You are not in a room.' }));
                    return;
                }

                const message = msg.message;
                if (typeof message !== 'string' || message.length > 1000) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message (max length: 1000)' }));
                    return;
                }

                addMessage(room, thisUser.username, message);
                updateRoom(room);

                return;
            }
        }
    });

    ws.on('close', () => {
        if (ws._username === undefined || users[ws._username] === undefined) {
            return;
        }

        const thisUser = users[ws._username];
        
        // If the user is in a room, remove them
        if (thisUser.room != null && rooms[thisUser.room] !== undefined) {
            const room = rooms[thisUser.room];
            delete room.users[thisUser.username];
            addMessage(room, null, `${thisUser.username} has left the room`);
            updateRoom(room);
        }

        // Delete the user
        delete users[thisUser.username];
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))