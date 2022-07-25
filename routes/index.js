var express = require('express');
var router = express();
const multer = require('multer');
var User = require('../models/user');
var Subject = require('../models/subject');
var Marks = require('../models/marks');
// var AllSubject = require('../models/allsubject');
var AdminLogin = require('../models/adminlogin');

router.get('/', (req, res, next) => {
	return res.render('welcome.ejs');
});

router.get('/subject', (req, res, next) => {
	//return res.render('subject.ejs');
	console.log("Subject");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("Subject");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			console.log("found");
			return res.render('subject.ejs', { "username": data.username, "sub1": data.sub1, "sub2": data.sub2, "sub3": data.sub3, "sub4": data.sub4, "sub5": data.sub5, "sub6": data.sub6, "ele1": data.ele1, "ele2": data.ele2, "ele3": data.ele3, "mp1": data.mp1, "mp2": data.mp2 });
		}
	});
});
router.get('/comp_subject', (req, res, next) => {
	//return res.render('subject.ejs');
	console.log("Comp Subject");
	Subject.findOne({ username: req.session.userId }, (err, data) => {
		console.log("Subject");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			console.log("found");
			return res.render('comp_subject.ejs', { "username": data.username, "sem1_sub1": data.sem1_sub1, "sem1_sub2": data.sem1_sub2, "sem1_sub3": data.sem1_sub3, "sem1_sub4": data.sem1_sub4, "sem1_sub5": data.sem1_sub5, "sem1_sub6": data.sem1_sub6, "sem2_sub1": data.sem2_sub1, "sem2_sub2": data.sem2_sub2, "sem2_sub3": data.sem2_sub3, "sem2_sub4": data.sem2_sub4, "sem2_sub5": data.sem2_sub5, "sem2_sub6": data.sem2_sub6, "sem3_sub1": data.sem3_sub1, "sem3_sub2": data.sem3_sub2, "sem3_sub3": data.sem3_sub3, "sem3_sub4": data.sem3_sub4, "sem3_sub5": data.sem3_sub5, "sem3_sub6": data.sem3_sub6, "sem4_sub1": data.sem4_sub1, "sem4_sub2": data.sem4_sub2, "sem4_sub3": data.sem4_sub3, "sem4_sub4": data.sem4_sub4, "sem4_sub5": data.sem4_sub5, "sem4_sub6": data.sem4_sub6, "sem5_sub1": data.sem5_sub1, "sem5_sub2": data.sem5_sub2, "sem5_sub3": data.sem5_sub3, "sem5_sub4": data.sem5_sub4, "sem5_sub5": data.sem5_sub5, "sem5_mp": data.sem5_mp, "sem6_sub": data.sem6_sub, "sem6_mp2": data.sem6_mp2, "sem6_ele1": data.sem6_ele1, "sem6_ele2": data.sem6_ele2, "sem6_ele3": data.sem6_ele3 });
		}
	});
});

router.get('/student_search', (req, res, next) => {
	return res.render('search_student.ejs');
});
router.get('/allsubject', (req, res, next) => {
	return res.render('allsub.ejs');
});

router.post('/subdetails', (req, res, next) => {
	//return res.render('dean_home.ejs');
	console.log("Dean-HomePage");
	Subject.findOne({ subjectname: req.body.email }, function (err, data) {
		console.log(req.body.browser);
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Subject is not available" });
		} else {
			//console.log("found");
			return res.render('sub_detail.ejs',{"subjectname":data.subjectname,"userstu1":data.userstu1,"namestu1":data.namestu1,"userstu2":data.userstu2,"namestu2":data.namestu2,"userstu3":data.userstu3,"namestu3":data.namestu3,"userstu4":data.userstu4,"namestu4":data.namestu4,});
		}
	});
});

router.get('/res_search', (req, res, next) => {
	return res.render('search_result_stu.ejs');
});

// router.get('/fee',(req,res,next)=>{
// 	return res.render('fee.ejs');
// });

router.get('/course_coordinator_s', (req, res, next) => {
	return res.render('course_coordinator_s.ejs');
});


router.get('/dean_home', (req, res, next) => {
	//return res.render('dean_home.ejs');
	console.log("Dean-HomePage");
	User.findOne({ username: req.session.userId }, function (err, data) {
		console.log("home");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('dean_home.ejs');
		}
	});
});
router.get('/fee', (req, res, next) => {
	//return res.render('dean_home.ejs');
	console.log("Dean-HomePage");
	User.findOne({ username: req.session.userId }, function (err, data) {
		//	console.log("home");
		//console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('fee.ejs', { "fees": data.fees, "feedue": data.feedue, "latefee": data.latefee, "paidfee": data.paidfee });
		}
	});
});
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'calender')
	},
	filename: function (req, file, cb) {

		cb(null, `${file.originalname}`)

	}


})

var upload = multer({ storage: storage })

var storage2 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'timetable')
	},
	filename: function (req, file, cb) {

		cb(null, `${file.originalname}`)
	}


})

var upload2 = multer({ storage: storage2 })


router.post('/', (req, res, next) => {
	console.log(req.body);
	var personInfo = req.body;


	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, (err, data) => {
				if (!data) {
					var c;
					User.findOne({}, (err, data) => {

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save((err, Person) => {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/course_coordinator', (req, res, next) => {
	return res.render('course_coordinator.ejs');
});
router.get('/login', (req, res, next) => {
	return res.render('login.ejs');
});

router.post('/login', (req, res, next) => {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, (err, data) => {
		if (data) {

			if (data.password == req.body.password) {
				//console.log("Done Login");
				req.session.userId = data.username;
				//console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				//alert("Email and Password is worng");
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });

		}
	});
});

router.get('/home', (req, res, next) => {
	console.log("HomePage");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("home");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('home.ejs');
		}
	});
});
router.get('/register', (req, res, next) => {
	console.log("register ");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("register");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('register.ejs');
		}
	});
});

router.get('/signout', (req, res, next) => {
	console.log("signout")
	if (req.session) {
		// delete session object
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/profile', (req, res, next) => {
	console.log("profile");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("profile");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('profile.ejs', { "username": data.username, "firstname": data.firstname, "lastname": data.lastname, "email": data.email, "number": data.number, "address": data.address });
		}
	});
});

router.get('/timetable', (req, res, next) => {
	console.log("timetable");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("timetable");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('timetable.ejs');
		}
	});
});


router.get('/calendar', (req, res, next) => {
	console.log("calendar");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("calendar");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('calendar.ejs');
		}
	});
});

router.get('/result', (req, res, next) => {
	console.log("result");
	Marks.findOne({ username: req.session.userId }, (err, data) => {
		console.log("result_2");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('result.ejs', { "username": data.username, "c1_sub1": data.c1_sub1, "c2_sub1": data.c2_sub1, "c3_sub1": data.c3_sub1, "c1_sub2": data.c1_sub2, "c2_sub2": data.c2_sub2, "c3_sub2": data.c3_sub2, "c1_sub3": data.c1_sub3, "c2_sub3": data.c2_sub3, "c3_sub3": data.c3_sub3, "c1_sub4": data.c1_sub4, "c2_sub4": data.c2_sub4, "c3_sub4": data.c3_sub4, "c1_sub5": data.c1_sub5, "c2_sub5": data.c2_sub5, "c3_sub5": data.c3_sub5, "sub1": data.sub1, "sub2": data.sub2, "sub3": data.sub3, "sub4": data.sub4, "sub5": data.sub5, "ele1": data.ele1, "ele2": data.ele2, "ele3": data.ele3, "c1_ele1": data.c1_ele1, "c2_ele1": data.c2_ele1, "c3_ele1": data.c3_ele1, "c1_ele2": data.c1_ele2, "c2_ele2": data.c2_ele2, "c3_ele2": data.c3_ele2, "c1_ele3": data.c1_ele3, "c2_ele3": data.c2_ele3, "c3_ele3": data.c3_ele3, "c1_mp1": data.c1_mp1, "c2_mp1": data.c2_mp1, "c3_mp1": data.c3_mp1, "c1_mp2": data.c1_mp2, "c2_mp2": data.c2_mp2, "c3_mp2": data.c3_mp2, "mp1": data.mp1, "mp2": data.mp2 });

		}
	});
});

router.get('/dean_login', (req, res, next) => {
	return res.render("dean_login.ejs");
});

router.post('/dean_login', (req, res, next) => {
	console.log("Here");
	AdminLogin.findOne({ email: req.body.email }, (err, data) => {
		if (data) {
			console.log(data);
			if (data.password == req.body.password) {
				console.log("Done Login");
				req.session.userId = data.username;
				console.log(req.session.userId);
				res.send({ "Success": "Success!" });


			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});
router.get('/forgetpass', (req, res, next) => {
	res.render("forget.ejs");
});


router.get('/pro_update', (req, res, next) => {
	res.render("profile_update.ejs");
});

router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}


	// res.send(file)
	res.send('Successfully Uploaded');

})

router.post('/uploadfile2', upload2.single('myFile'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	// res.send(file)
	res.send('Successfully Uploaded');

})

router.post('/forgetpass', (req, res, next) => {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({ email: req.body.email }, (err, data) => {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save((err, Person) => {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});

router.get('/stu_status', (req, res, next) => {
	//return res.render('subject.ejs');
	console.log("Subject");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("Subject");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			console.log("found");
			var s;
			if (data.attendence < 75) {
				s = "Not eligible for C3 Examination";
			}
			else {
				s = "Eligible for C3 Examination";
			}
			return res.render('student_status.ejs', { "cgpa": data.cgpa, "attendence": data.attendence, "penalty": data.penalty, "drpcourse": data.drpcourse, "statement": s });
		}
	});
});
router.get('/modify_result_1', (req, res, next) => {
	return res.render('res_modify_1.ejs');
});
router.post('/modify_result_1', (req, res, next) => {
	console.log("Here");
	User.findOne({ username: req.body.email }, (err, data) => {
		if (data) {


			console.log("Done Login");

			console.log(req.session.userId);
			return res.render('result_admin_m.ejs', { "username": data.username, "sub1": data.sub1, "sub2": data.sub2, "sub3": data.sub3, "sub4": data.sub4, "sub5": data.sub5, "sub6": data.sub6, "ele1": data.ele1, "ele2": data.ele2, "ele3": data.ele3, "mp1": data.mp1, "mp2": data.mp2 });

		} else {
			res.send({ "Success": "This User name Is not regestered!" });
		}
	});
});
router.post('/modify_result_2', (req, res, next) => {
	console.log("Here");
	Marks.findOne({ username: req.body.username }, (err, data) => {
		if (data) {

			console.log("Done Login");
			console.log(req.session.userId);
			if (req.body.sub1_c1 != 0) {
				data.c1_sub1 = req.body.sub1_c1;
			}
			if (req.body.sub1_c2 != 0) {
				data.c2_sub1 = req.body.sub1_c2;
			}
			if (req.body.sub1_c3 != 0) {
				data.c3_sub1 = req.body.sub1_c3;
			}
			if (req.body.sub2_c1 != 0) {
				data.c1_sub2 = req.body.sub2_c1;
			}
			if (req.body.sub2_c2 != 0) {
				data.c2_sub2 = req.body.sub2_c2;
			}
			if (req.body.sub2_c3 != 0) {
				data.c3_sub2 = req.body.sub2_c3;
			}
			if (req.body.sub3_c1 != 0) {
				data.c1_sub3 = req.body.sub3_c1;
			}
			if (req.body.sub3_c2 != 0) {
				data.c2_sub3 = req.body.sub3_c2;
			}
			if (req.body.sub3_c3 != 0) {
				data.c3_sub3 = req.body.sub3_c3;
			}
			if (req.body.sub4_c1 != 0) {
				data.c1_sub4 = req.body.sub4_c1;
			}
			if (req.body.sub4_c2 != 0) {
				data.c2_sub4 = req.body.sub4_c2;
			}
			if (req.body.sub4_c3 != 0) {
				data.c3_sub4 = req.body.sub4_c3;
			}
			if (req.body.sub5_c1 != 0) {
				data.c1_sub5 = req.body.sub5_c1;
			}
			if (req.body.sub5_c2 != 0) {
				data.c2_sub5 = req.body.sub5_c2;
			}
			if (req.body.sub5_c3 != 0) {
				data.c3_sub5 = req.body.sub5_c3;
			}
			if (req.body.sub6_c1 != 0) {
				data.c1_sub6 = req.body.sub6_c1;
			}
			if (req.body.sub6_c2 != 0) {
				data.c2_sub6 = req.body.sub6_c2;
			}
			if (req.body.sub6_c3 != 0) {
				data.c3_sub6 = req.body.sub6_c3;
			}
			if (req.body.ele1_c1 != 0) {
				data.c1_ele1 = req.body.ele1_c1;
			}
			if (req.body.ele1_c2 != 0) {
				data.c2_ele1 = req.body.ele1_c2;
			}
			if (req.body.ele1_c3 != 0) {
				data.c3_ele1 = req.body.ele1_c3;
			}
			if (req.body.ele2_c1 != 0) {
				data.c1_ele2 = req.body.ele2_c1;
			}
			if (req.body.ele2_c2 != 0) {
				data.c2_ele2 = req.body.ele2_c2;
			}
			if (req.body.ele2_c3 != 0) {
				data.c3_ele2 = req.body.ele2_c3;
			}
			if (req.body.ele3_c1 != 0) {
				data.c1_ele3 = req.body.ele3_c1;
			}
			if (req.body.ele3_c2 != 0) {
				data.c2_ele3 = req.body.ele3_c2;
			}
			if (req.body.ele3_c3 != 0) {
				data.c3_ele3 = req.body.ele3_c3;
			}
			if (req.body.mp1_c1 != 0) {
				data.c1_mp1 = req.body.mp1_c1;
			}
			if (req.body.mp1_c2 != 0) {
				data.c2_mp1 = req.body.mp1_c2;
			}
			if (req.body.mp1_c3 != 0) {
				data.c3_mp1 = req.body.mp1_c3;
			}
			if (req.body.mp2_c1 != 0) {
				data.c1_mp2 = req.body.mp2_c1;
			}
			if (req.body.mp2_c2 != 0) {
				data.c2_mp2 = req.body.mp2_c2;
			}
			if (req.body.mp3_c3 != 0) {
				data.c3_mp3 = req.body.mp3_c3;
			}

			data.save((err, Person) => {
				if (err)
					console.log(err);
				else
					console.log('Success');
				res.send({ "Success": "Marks Updated" });
			});

		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.post('/pro_update', (req, res, next) => {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({ username: req.body.username }, (err, data) => {
		console.log(data);
		if (!data) {
			res.send({ "Error": "User Name not found" });
		} else {


			if (req.body.number.length != 0) {
				data.number = req.body.number;
			}
			if (req.body.address.length != 0) {
				data.address = req.body.address;
			}
			if (req.body.attendence.length != 0) {
				data.attendence = req.body.attendence;
			}
			if (req.body.penalty.length != 0) {
				data.penalty = req.body.penalty;
			}
			if (req.body.cgpa.length != 0) {
				data.cgpa = req.body.cgpa;
			}
			data.save((err, Person) => {
				if (err)
					console.log(err);
				else
					console.log('Success');
				res.send({ "Success": "Profile Updated" });
			});
			/*} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}*/
		}
	});

});


/*router.post('/stu_status', function(req, res) {
	console.log("student status");
	User.findOne({ username: req.session.userId }, (err, data) => {
		console.log("student status");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			 res.render('student_status.ejs',{ "cgpa": data.cgpa,"attendence":data.attendence,"drpcourse":data.drpcourse,"penalty":data.penalty});
			//	console.log(data);
		}
	});
});
*/
router.post('/search_student', function (req, res) {
	console.log("Here");
	User.findOne({ username: req.body.email }, (err, data) => {
		if (data) {
			console.log("Done Login");
			//req.session.userId = data.username;
			console.log(req.session.userId);

			res.render('search_result.ejs', { "username": data.username, "firstname": data.firstname, "lastname": data.lastname, "email": data.email, "number": data.number, "address": data.address, "sub1": data.sub1, "sub2": data.sub2, "sub3": data.sub3, "sub4": data.sub4, "sub5": data.sub5, "sub6": data.sub6, "ele1": data.ele1, "ele2": data.ele2, "ele3": data.ele3, "mp1": data.mp1, "mp2": data.mp2, "cgpa": data.cgpa, "attendence": data.attendence, "drpcourse": data.drpcourse, "penalty": data.penalty, "fees": data.fees, "feedue": data.feedue, "latefee": data.latefee, "paidfee": data.paidfee });

		} else {
			res.send({ "Success": "This User name Is not regestered!" });
		}
	});
});

router.post('/search_result_stu', function (req, res) {
	console.log("Here");
	Marks.findOne({ username: req.body.email }, (err, data) => {
		if (data) {


			console.log("Done Login");
			//req.session.userId = data.username;
			console.log(req.session.userId);
			return res.render('dean_result.ejs', { "username": data.username, "c1_sub1": data.c1_sub1, "c2_sub1": data.c2_sub1, "c3_sub1": data.c3_sub1, "c1_sub2": data.c1_sub2, "c2_sub2": data.c2_sub2, "c3_sub2": data.c3_sub2, "c1_sub3": data.c1_sub3, "c2_sub3": data.c2_sub3, "c3_sub3": data.c3_sub3, "c1_sub4": data.c1_sub4, "c2_sub4": data.c2_sub4, "c3_sub4": data.c3_sub4, "c1_sub5": data.c1_sub5, "c2_sub5": data.c2_sub5, "c3_sub5": data.c3_sub5, "sub1": data.sub1, "sub2": data.sub2, "sub3": data.sub3, "sub4": data.sub4, "sub5": data.sub5, "ele1": data.ele1, "ele2": data.ele2, "ele3": data.ele3, "c1_ele1": data.c1_ele1, "c2_ele1": data.c2_ele1, "c3_ele1": data.c3_ele1, "c1_ele2": data.c1_ele2, "c2_ele2": data.c2_ele2, "c3_ele2": data.c3_ele2, "c1_ele3": data.c1_ele3, "c2_ele3": data.c2_ele3, "c3_ele3": data.c3_ele3, "c1_mp1": data.c1_mp1, "c2_mp1": data.c2_mp1, "c3_mp1": data.c3_mp1, "c1_mp2": data.c1_mp2, "c2_mp2": data.c2_mp2, "c3_mp2": data.c3_mp2, "mp1": data.mp1, "mp2": data.mp2 });

			//res.render('dean_result.ejs',{ "username": data.username});

		} else {
			res.send({ "Success": "This User name Is not regestered!" });
		}
	});
});




module.exports = router;