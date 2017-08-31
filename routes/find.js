const express = require('express');
const router = express.Router();
const user = require('../model/schema'); // importing model/schema.js

router.get('/', (req,res) => {
	user.find((err,data) => {
		if(err){															// if error occur
			res.send(err);
		}
		else{
			res.json(data);		// response to browser in json format
		}
	})
});

module.exports = router;