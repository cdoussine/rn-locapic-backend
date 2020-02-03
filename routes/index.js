var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST sign-up */
router.post('/signup', async function(req, res, next) {

  const user = await userModel.findOne({
    email:req.body.email
  })

  // We are checking it there is a user or not 
  if(user){
    
    console.log('We found a User with this email')
    res.json({user});
    
  }else{

    console.log('There is no user with this email ! So we add a user')
  
    const newUser = new userModel({
      first_name: req.body.first_name,
      email: req.body.email,
    });

    newUser.save(function(error, user) {
      console.log("USER SAVED ---->", user)
      res.json({user});
    });
  } 
});

/* POST Location. */
// TO CONTINU VERIFIER SI _ID CA MARCHE
router.post('/logposition', function(req, res){

    console.log('Dans ma route logposition je reçois du front -->', req.body)

    userModel.findOne({_id : req.body.userId}, 
      function(err, user) {

      if(user) {

        console.log('et j ai Dans ma base de donnée --->',user)
        
        user.historiquePosition.push({latitude: req.body.latitude, longitude: req.body.longitude});
        user.save();
        res.json({result: true});

      } else {

        res.json({result:true});

      }


    })
  }
)

router.get('/logposition', function(req, res){

    userModel.findOne({_id : req.query.userId}, 
      function(err, user) {

      if(user) {
      
        // console.log('et j ai Dans ma base de donnée --->',user)  

        res.json({result: true,historiquePosition : user.historiquePosition});

      } else {

        console.log('Aucun user dans ma BD --->')
        res.json({result:true, historiquePosition:[]});

      }
    })
  }
)

module.exports = router;
