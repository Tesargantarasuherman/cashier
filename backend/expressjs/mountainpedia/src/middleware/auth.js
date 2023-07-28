let connection = require('../../connection')
let mysql = require('mysql');
let md5 = require('md5');
let response = require('../../res');
let jwt = require('jsonwebtoken');
let config = require('../configs/secret')
let ip = require('ip');
// send email verification
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const {EMAIL,PASSWORD} = require('../../env')
// controller untuk register
exports.registrasi = async function (req, res) {
    let post = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }

    let transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

    let MailGenerator = new Mailgen({
        theme:'default',
        product:{
            name:"Mailgen",
            link:'https://mailgen.js/'
        }
    }) 

    let response ={
        body:{
            name:"MOUNTAINPEDIA",
            intro:'VERIFICATION YOUR ACCOUNT',
            table:{
                data:{
                    item:"lorem"
                }
            },
            outro:"Enjoy"
        }
    }
    let mail = MailGenerator.generate(response);

    let message = {
        from:EMAIL,
        to:post.email,
        subject:"VERIFICATION",
        html:mail
    }

    transport.sendMail(message).then(()=>{
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query,function (error, rows) {
        if (error) {
            throw error;
        } else {
            if(rows.length == 0){
                connection.query(`INSERT INTO user (name,email,password,role) VALUES(?,?,?,?)`,
                [post.name,post.email,post.password,post.role],
                function (error, rows, fields) {
                    if (error) {
                        throw error
                    } else {
                        return res.status(201).json({message:`email has been send to your email`});
                    }
                });
            }
            else{
                return res.status(201).json({message:`Email Sudah Terdaftar`});
            }
        }
    });
    
    }).catch(error=>{
            return res.status(500).json({error})
    })  
      

    
}
exports.login = function (req, res) {
    let post = {
        email: req.body.email,
        password: req.body.password,
    }
    let query = "SELECT * FROM ?? WHERE ??=? AND ??=? ";
    let table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
             throw error ;
        } else {
            if(rows.length ==1){
                let data_user = rows;
                let expired = 1440

                let token = jwt.sign({rows},config.secret,{
                    expiresIn: expired
                })

                let post = {
                    id_user: rows[0].id,
                    access_token: token,
                    ip_address : ip.address()
                }
                // set ke access_token
                var query = "INSERT INTO ?? SET ?";
                var table = ["access_token"];

                query = mysql.format(query, table);
                connection.query(`INSERT INTO access_token (id_user,access_token,ip_address) VALUES(?,?,?)`,
                [post.id_user,post.access_token,post.ip_address],function(error,rows){
                    if(error){
                        console.log(error)
                    }
                    else{
                        res.json({
                            success:true,
                            message:'Token successfully',
                            token:access_token,
                            expired:expired,
                            data_user
                        })
                    }
                })

            }
            else{
              res.json({'Error':true,"Message":"email atau pass salah"});  
            }
        }
    })
}
exports.admin = function (req, res) {
    response.ok('Page for admin',res);
}