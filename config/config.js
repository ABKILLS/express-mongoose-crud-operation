import mongoose from 'mongoose';
const connect = mongoose.connect('mongodb://localhost:27017/employee',{
  useMongoClient: true,
  /* other options */
});
console.log("Mongo Connection Established");
export default connect;