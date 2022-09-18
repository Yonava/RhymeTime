const io = require('socket.io')(3000, {
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  console.log(`${socket.id} connected`)

  socket.on('visibility-handler', visibility => {
    socket.broadcast.emit('visibility-handler', visibility)
  })

  socket.on('change-view', (view) => {
    socket.broadcast.emit('change-view', view)
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

});