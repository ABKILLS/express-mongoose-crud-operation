const express = require('express');
const router = express.Router();
const user = require('../model/schema'); // importing model/schema.js

router.post('/', (req,res) => {
	user.create(req.body,(err,user) => {
		if(err)				// if error occurs
		{
			return res.json(err);
		}
		else {
			res.json(user);   // response to browser in json format
		}
	});
});

module.exports = router;