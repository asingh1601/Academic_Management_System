var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	subject: String,
    userstu1:String,
    namestu1:String,
    userstu2:String,
    namestu2:String,
    userstu3:String,
    namestu3:String,
    userstu4:String,
    namestu4:String,
}),
AllSubject = mongoose.model('AllSubject', userSchema);

module.exports = AllSubject;