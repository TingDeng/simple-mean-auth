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
      });// passport will show err message design interal
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
  //next is kick them to next round...
  passport.authenticate('local',function(err, user, info){
  if(err){
     return next(err);
  }
  if(!user){
    return res.status(401).json({
      err:info
    });//unauthoried access is 401
  }//sign in without account
  req.logIn(user,function(err){
    if(err){
      return res.status(500).json({
        err:'Could not log in user'
      })
    }
    res.status(200).json({
      status:'Login successful'
    });
  })//during login, maybe some connection error
})(req,res,next);
});

router.get('/logout', function(req, res) {
  //Logout route , for  express and passport need argument function(req,res)
   req.logout();// a passport method
   res.status(200).json({
     status:'Bye'
   });
});
//../means come out and get back in
router.get('/status', function(req, res) {
  //Why do we need a status route?
  if(!req.isAuthenticated()){
    return res.status(200).json({
      status: false,
    });
  }
  res.status(200).json({
    status:true
  });
});///user/login or logout or..//login is post, get:status,logout is get;

//$scope is when code interact with page, 

module.exports = router;
