
// Socket endpoints
// Authored by Yona Voss-Andreae @yonava

const { server } = require('./index')

console.log('Sockets Live!')

const SOCKET_SERVER = process.env.NODE_ENV === 'production' ? server : 3000
const io = module.exports.io = require('socket.io')(SOCKET_SERVER, {
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

  socket.on('report-to-players', () => {
    socket.to(roomid).emit('report-to-players')
  })

  socket.on('disconnect', () => {
    socket.to(roomid).emit('roll-call')
  })

  socket.on('join-room', (room, callback) => {
    roomid = room
    socket.join(roomid)
    if (typeof callback === "function") callback('connected')
  })

  // in game communication
  socket.on('player-prompt-response', (playerResponse, callback) => {
    socket.to(roomid).emit('player-prompt-submission', playerResponse)
    if (typeof callback === "function") callback('sent')
  })

})