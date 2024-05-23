const io = require("socket.io")(8900,{
    cors:{
          origin:"http://localhost:3000"
    }
});
let users =[];
let groups =[];
console.log('users:',users);
// console.log('groups:',groups);
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };


// const addGroup = (groupId,socketId) => {

//    !groups.some((group) => group.groupId === groupId) &&
//   groups.push({groupId,socketId});
//  console.log('groups:',groups);

//   };

const addGroup = (groupId, socketId) => {
  // Check if a group with the same groupId exists
  const existingGroup = groups.find(group => group.groupId === groupId);
  
  // If a group with the same groupId exists
  if (existingGroup) {
    // Check if the socketId already exists in the existingGroup
    if (!existingGroup.socketIds.includes(socketId)) {
      // If socketId does not exist, push it into the socketIds array
      existingGroup.socketIds.push(socketId);
    }
  } else {
    // If the groupId is new, create a new group with the provided groupId and socketId
    const newGroup = {
      groupId: groupId,
      socketIds: [socketId] // Use an array to store socketIds
    };
    groups.push(newGroup);
  }
  
  console.log('groups:', groups);
};


  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  const removeGroup = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    console.log(users)
    return users.find((user) => user.userId === userId);
  };
  const getGroup = (groupId) => {
    console.log('grpid', groupId)
    const group=groups.find((group) => group.groupId === groupId);
    return group 
  };
  
io.on("connection",(socket)=>{
    console.log('a user connected.')


      //take userId and socketId from user
    socket.on('addUser',(userId )=>{
        addUser(userId,socket.id);
        // addGroup(groupId,socket.id);
        io.emit("getUsers", users);
        // io.emit("getGroup", groups);
    })
    socket.on('addGroup',(groupId )=>{
      console.log('haiibfszdbxfsafxfzfgdh')
        addGroup(groupId,socket.id);
    
        io.emit("getGroup", groups);
    })


      //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    removeGroup(socket.id);
    io.emit("getUsers", users);
    io.emit("getGroups", groups);
  });

    socket.on("sendMessage", ({ senderId, receiverId, groupId, text, isGroup }) => {
  
      if (isGroup) {
        // Handle group conversation
        console.log('sendMessage')
        const group = getGroup(groupId);
        console.log('grp',group)
        if (group) {
          // Remove the specific socket ID from the group's socket IDs
          group.socketIds = group.socketIds.filter(id => id !== socket.id);
        
          // Emit the message to the remaining socket IDs
          group.socketIds.forEach(socketId => {
            io.to(socketId).emit("getMessage", {
              senderId,
              text,
            });
          });
        
          console.log('getMessage');
        }
        else {
          console.log('Group not found');
      }

      } else {
        // Handle one-to-one conversation
        const user = getUser(receiverId);
        if (user) {
          io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
          });
        }
      }
    });   
})
