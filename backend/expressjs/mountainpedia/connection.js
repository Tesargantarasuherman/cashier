var mysql =  require('mysql');

// buat koneksi db
const conn = mysql.createConnection({
    host                : 'localhost',
    user                : 'root',
    password            : '',
    database            : 'mountainpedia'
})

conn.connect((err)=>{
    if(err) throw err;

    console.log('SQL CONNECTED');
})

module.exports = conn;