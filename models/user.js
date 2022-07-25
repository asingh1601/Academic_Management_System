var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	firstname:String,
	lastname:String,
	email: String,
	number:String,
	address:String,
	username: String,
	password: String,
	passwordConf: String,
	sub1:String,
	sub2:String,
	sub3:String,
	sub4:String,
	sub5:String,
	sub6:String,
	ele1:String,
	ele2:String,
	ele3:String,
	mp1:String,
	mp2:String,
	cgpa:Number,
	attendence:Number,
	drpcourse:String,
	penalty:String,
	fees:Number,
	feedue:Number,
	latefee:Number,
	paidfee:Number
}),
User = mongoose.model('User', userSchema);

module.exports = User;