const express = require('express')
const mysql = require('mysql')

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
  res.json({ npm: 'run dev' })
})

app.get('/createsandwichtable', (req, res) => {
  let sqlStatement = 'CREATE TABLE sandwiches(id int AUTO_INCREMENT, title VARCHAR(255));'
  db.query(sqlStatement, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Table Created!')
  })
})

app.get('/seesandwiches', (req, res) => {
  res.json({})
})

app.listen(3000, () => {
  console.log('Running on localhost:3000')})