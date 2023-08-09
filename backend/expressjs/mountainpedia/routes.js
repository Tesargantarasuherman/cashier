'use strict'
let verification = require('./src/middleware/verification');

module.exports =function(app){
    let {user}= require('./src/controllers');
    app.route('/api/v1/user/profile',verification(1)).post(user.index)
    app.route('/user/register').post(user.register)
}