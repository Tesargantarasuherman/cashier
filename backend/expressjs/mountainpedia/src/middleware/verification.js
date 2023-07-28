const jwt = require('jsonwebtoken')
const config =require('../configs/secret')

function verification(role){
    return function(req,res,next){
        let tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            jwt.verify(token,config.secret,function(err,decoded){
                if(err){
                    return res.status(401).send({auth:false,message:'Token unregistered'});
                }else{
                    req.auth = decoded;
                    if(role == req.auth.rows[0].role){
                        next();
                    }
                    else{
                        return res.status(401).send({auth:false,message:'Role can"t be access'});
                    }
                }
            })
        }
        else{
            return res.status(401).send({auth:false,message:'Token unavailable'});
        }
    }
}
module.exports = verification