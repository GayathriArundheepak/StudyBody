const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const serverPort = process.env.SERVER_PORT || 8900;
const clientPort = process.env.CLIENT_PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: `http://localhost:${clientPort}`
    }
});

let users = [];
let groups = [];
console.log('users:', users);

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const addGroup = (groupId, socketId) => {
    const existingGroup = groups.find(group => group.groupId === groupId);
    if (existingGroup) {
        if (!existingGroup.socketIds.includes(socketId)) {
            existingGroup.socketIds.push(socketId);
        }
    } else {
        const newGroup = {
            groupId: groupId,
            socketIds: [socketId]
        };
        groups.push(newGroup);
    }
    console.log('groups:', groups);
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const removeGroup = (socketId) => {
    groups = groups.filter((group) => group.socketIds.includes(socketId));
};

const getUser = (userId) => {
    console.log(users);
    return users.find((user) => user.userId === userId);
};

const getGroup = (groupId) => {
    console.log('grpid', groupId);
    const group = groups.find((group) => group.groupId === groupId);
    return group;
};

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('addGroup', (groupId) => {
        console.log('Adding group...');
        addGroup(groupId, socket.id);
        io.emit('getGroup', groups);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected!');
        removeUser(socket.id);
        removeGroup(socket.id);
        io.emit('getUsers', users);
        io.emit('getGroups', groups);
    });

    socket.on('sendMessage', ({ senderId, receiverId, groupId, text, isGroup }) => {
        if (isGroup) {
            const group = getGroup(groupId);
            if (group) {
                group.socketIds.forEach(socketId => {
                    if (socketId !== socket.id) {
                        io.to(socketId).emit('getMessage', {
                            senderId,
                            text,
                        });
                    }
                });
            } else {
                console.log('Group not found');
            }
        } else {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit('getMessage', {
                    senderId,
                    text,
                });
            }
        }
    });
});

// Route to check if server is running
app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
    console.log('Received a request to the root route');
});

// Start the server
server.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});
