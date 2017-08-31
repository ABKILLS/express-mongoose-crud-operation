const express = require('express');
const router = express.Router();
const user = require('../model/schema'); // importing model/schema.js

router.delete('/', (req, res) =>{
  user.remove({
    name: req.body.name
  }, (err,user) => {
    if(err) {   // if error occurs
      res.json('err')
    } 
    else {
      res.json(user); // response to browser in json format
    }
  });
});

module.exports = router;