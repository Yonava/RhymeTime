const io = require('socket.io')(3000, {
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  let roomid;

  socket.on('visibility-handler', (visibility) => {
    socket.to(roomid).emit('visibility-handler', visibility)
  })

  socket.on('player-join', (username) => {
    socket.to(roomid).emit('player-join', username)
  })

  socket.on('change-view', (view) => {
    socket.to(roomid).emit('change-view', view)
  })

  socket.on('host-present', () => {
    socket.to(roomid).emit('host-present')
  })

  socket.on('report-to-host', () => {
    socket.to(roomid).emit('report-to-host')
  })

  socket.on('disconnect', () => {
    socket.to(roomid).emit('roll-call')
  })

  socket.on('join-room', (room, callback) => {
    roomid = room
    socket.join(roomid)
    if (typeof callback === "function") callback('connected')
  });

});