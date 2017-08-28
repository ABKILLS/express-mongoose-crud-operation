import express from 'express';
const router = express.Router();
import user from '../model/schema';
router.delete('/delete/:id', (req, res) =>{
  user.findOneAndRemove({
    _id: req.params.id
  }, (err,user) => {
    if(err) {
      res.send('error removing')
    } else {
    	console.log('deleted successfully',req.params.id);
      console.log(user);
    }
  });
});

export default router;