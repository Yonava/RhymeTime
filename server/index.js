const express = require('express')
const mysql = require('mysql')
const PORT = process.env.PORT || 1010
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// require('./sockets')

const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
})

app.use(bodyParser.json())
app.use(cors())

io.on('connection', socket => {
  let roomid

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

})

const db = mysql.createConnection({
  host: 'bageterie-boulevard.c0w2juzukesp.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'bageterie',
  database: 'bageterieboulevard'
})

db.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database Connected!')
})

app.get('/addsandwich', (req, res) => {
  let sqlStatement = 'INSERT INTO sandwiches(title) VALUES ("balkaski menu - beef")'
  db.query(sqlStatement, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Check Console For Added Sandwich')
  })
})

app.get('/createsandwichtable', (req, res) => {
  let sqlStatement = 'CREATE TABLE sandwiches(id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY (id))'
  db.query(sqlStatement, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Table Created!')
  })
})

app.get('/seesandwiches', (req, res) => {
  let sqlStatement = 'SELECT title FROM sandwiches WHERE title LIKE "%chicken%"'
  db.query(sqlStatement, (err, result) => {
    if (err) throw err
    console.log(result)
    res.json(result)
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)})