import express from 'express';
const router = express.Router();
import user from '../model/schema';
router.put('/update/:id', (req,res) => {
	user.findOneAndUpdate({_id: req.params.id},
		{$set: {name: req.body.name, age: req.body.age, address: req.body.address }},
		{upsert: true},
			(err,user) => {
				if(err) {
					console.log("error in updation", err);
				}
				else {
					console.log("updated");
					res.send(user);
				}
			}
		);
});
export default router;