import express from 'express';
const router = express.Router();
import user from '../model/schema';
router.get('/', (req,res) => {
	user.find((err,data) => {
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(data);
			res.json(data);
		}
	})
});

export default router;