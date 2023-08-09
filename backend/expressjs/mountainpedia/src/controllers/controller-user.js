const mysql = require('mysql');
const response = require('../../res')
const connection = require('../../connection');


    exports.index =(req,res)=>{
        let id = req.body.id
        let query ="SELECT * FROM ?? WHERE ??=?"
        let table = ["user","id",id]
        
        console.log(id);

        query = mysql.format(query,table);
        connection.query(query,function(error,rows){
            if(error){
                throw error
            }
            else{
                return res.json({
                    success:true,
                    mesagges:"Data Get Successfully",
                    data:rows
                })
            }
        })
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
