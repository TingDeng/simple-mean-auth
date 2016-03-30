var express = require('express');
var router = express.Router();//expension pack
var passport = require('passport');

var User = require('../models/user.model.js');


router.post('/register', function(req, res) {
  //registration route for signing up users
  // or you can do car user = new User({
  //username:req.body.username,
  //age:.....
//})
  User.register(new User({username:req.body.username}),req.body.password, function(err, account){
    if(err){
      return res.status(500).json({
        err:err
      });
    }
    passport.authenticate('local')(req,res,function(){
      return res.status(200).json({
        status:'Registration successful'
      })//database is wired up in index.js, only if mongod running
    })
  });//don't pass password now for security concern
});

router.post('/login', function(req, res, next) {
  //login route for logging in existing users
  // What do you notice about this function?
});

router.get('/logout', function(req, res) {
  //Logout route
});

router.get('/status', function(req, res) {
  //Why do we need a status route?
});///user/login or logout or..


module.exports = router;
