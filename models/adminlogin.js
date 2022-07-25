var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	email: String,
	password: String,
	passwordConf: String
	
}),
adminlogin = mongoose.model('adminlogin', userSchema);

module.exports = adminlogin;