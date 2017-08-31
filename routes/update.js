const express = require('express');
const router = express.Router();
const user = require('../model/schema');  // importing model/schema.js
router.put('/:name', (req,res) => {
	user.update({name: req.params.name},
		{$set: {name: req.body.name, age: req.body.age, address: req.body.address }},
		(err,user) => {
			if(err) {
			 res.send(err);  //if error occurs
			}
			else {
				res.json(user);  // response to browser in json format
			}
	});
});
module.exports = router;