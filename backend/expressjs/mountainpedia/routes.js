'use strict'

module.exports =function(app){
    let {user}= require('./src/controllers');

    app.route('/user').get(user.index)
    app.route('/user/register').post(user.register)
}