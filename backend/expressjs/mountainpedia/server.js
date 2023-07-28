const express = require('express');
let morgan = require('morgan');
const app = express()
const port = 8081
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

var routes = require('./routes');

routes(app)

// daftarkan menu routes dari index di folder middleware(otomatis dijalankan );

app.use('/auth',require('./src/middleware'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})