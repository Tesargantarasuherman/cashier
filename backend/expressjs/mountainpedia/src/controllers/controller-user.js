const mysql = require('mysql');
const response = require('../../res')
const connection = require('../../connection');


    exports.index =(req,res)=>{
        response.ok('Berhasil dijalankan',res)
    }

    exports.register =(req,res)=>{
        let name= req.body.name;
        let email= req.body.email;
        let password= req.body.password;

        connection.query(`INSERT INTO user (name,email,password) VALUES(?,?,?)`,[name,email,password],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data!", res)
            }
        });
  
    }
