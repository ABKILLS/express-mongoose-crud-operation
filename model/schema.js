import mongoose  from 'mongoose';
let Schema = mongoose.Schema;
let schema = new Schema({
	name : {type: String, required: true},
	age : Number,
	address : String,
	salary : Number
},{versionKey: false});

export default mongoose.model('userData',schema);