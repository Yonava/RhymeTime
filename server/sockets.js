const io = require('socket.io')(3000, {
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {

  socket.on('visibility-handler', visibility => {
    socket.broadcast.emit('visibility-handler', visibility)
  })

  socket.on('player-join', username => {
    socket.broadcast.emit('player-join', username)
  })

  socket.on('change-view', (view) => {
    socket.broadcast.emit('change-view', view)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('call-for-report')
  })

});