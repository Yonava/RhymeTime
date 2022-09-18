const express = require('express')
const mysql = require('mysql')
const PORT = process.env.PORT || 1010
const app = express()

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

const io = require('socket.io')(PORT, {
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  console.log(socket.id)
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)})