import express from 'express';
const router = express.Router();
import user from '../model/schema';

router.post('/insert', (req,res) => {
	user.create(req.body,(err,user) => {
		if(err)
		{
			console.log("error in insertion");
		}
		else {
			console.log(user);
			res.send(user);
		}
	});
});

export default router;