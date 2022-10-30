
// Socket endpoints
// Authored by Yona Voss-Andreae @yonava

const { server } = require('./index')


const SOCKET_SERVER = process.env.NODE_ENV === 'production' ? server : 3000
const io = module.exports.io = require('socket.io')(SOCKET_SERVER, {
  cors: {
    origin: "*"
  }
})

console.log('Sockets Live!')

io.on('connection', socket => {
  let roomid;

  // used by all clients to connect to a room. 
  // Callback is sent to client to confirm successful connection
  socket.on('join-room', (room, callback) => {
    roomid = room
    socket.join(roomid)
    if (typeof callback === "function") callback('connected')
  })

  // if anyone connected to the socket disconnects. May get messy with audience
  // when that gets implemented
  socket.on('disconnect', () => {
    socket.to(roomid).emit('disconnect-event')
  })

  // CONNECTION ENDPOINTS

  // emitted by player, received by host for constructing playerList
  socket.on('player-join', (joinRequest) => {
    socket.to(roomid).emit('player-join', joinRequest)
  })

  // emitted by host when they need to kick someone out of the player pool
  // either due to a full room, or manually
  socket.on('kicker', (kickObj) => {
    socket.to(roomid).emit('kick-listener', kickObj)
  })

  // emitted by host to control the view that the player sees
  socket.on('change-view', (view) => {
    socket.to(roomid).emit('change-view', view)
  })

  // emitted by host to let the players know that the host is present
  socket.on('host-present', () => {
    socket.to(roomid).emit('host-present')
  })

  // emitted by player when they first connect, 
  // tells host to send critical game-state to sync-up player
  socket.on('get-game-state', () => {
    socket.to(roomid).emit('broadcast-game-state')
  })

  // emitted by host to tell players if the game is paused, 
  // and what the reason for the pause is
  socket.on('pause-state', (pauseState) => {
    socket.to(roomid).emit('pause-state', pauseState)
  })

  // GAMEPLAY ENDPOINTS

  // emitted by player when they submit a prompt response to host
  socket.on('player-prompt-response', (playerResponse, callback) => {
    socket.to(roomid).emit('player-prompt-submission', playerResponse)
    if (typeof callback === "function") callback('sent')
  })

  // emitted by host to send a new prompt to the users
  socket.on('new-words', (newWords) => {
    socket.to(roomid).emit('new-words', newWords)
  })

  // emitted by host to tell players who they can vote for
  socket.on('candidate-list', (list) => {
    socket.to(roomid).emit('candidate-list', list)
  })

  // emitted by player so host can update the vote tallies
  socket.on('submit-ballot', (ballot) => {
    socket.to(roomid).emit('ballot-collector', ballot)
  })

  // emitted by player to tell host if player wants to skip tutorial
  socket.on('skip-vote', (vote) => {
    socket.to(roomid).emit('skip-vote', vote)
  })
  
})