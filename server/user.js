const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
// const Chat = model.getModel('chat') 2019.4.17 暂时隐藏
const _filter = {'pwd': 0, '__v': 0}
// Chat.remove({}, function(e,d){})
// User.remove({'$or': [{user: 're'},{user: 'yui'}]}, function(e,d){});
// User.remove({}, function(e,d){})
// User.create({
// 	name: '1',
// 	pwd: '1',
// 	type: 'guest'
// }, function(err, doc) {
// 	if (!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

Router.get('/list', function(req, res) {

	const {type, _id} = req.query
	if (type) {
		User.find({type}, function(err, doc) {
			return res.json({code: 0, data: doc})
		})
	}else if (_id) {
		User.findOne({_id}, function(err, doc) {
			return res.json({code: 0, data: doc})
		})
	} else {
		User.find({}, function(err, doc) {
			return res.json({code: 0, data: doc})
		})
	}
	
})
Router.post('/login', function(req, res) {
	const {user, pwd} = req.body;
	User.findOne({name: user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
		if (!doc) {
			return res.json({code: 1, msg: '用户名或密码错误'})
		}
		res.cookie('userid', doc._id);
		return res.json({code: 0, data: doc})
	})
})
Router.post('/register', function(req, res) {
	const {user, pwd, ...data} = req.body;
	User.findOne({name: user}, function(err, doc) {
		if (doc) {
			return res.json({code: 1, msg: '用户名重复'})
		}
		const userModel = new User({name: user, pwd: md5Pwd(pwd), ...data});
		userModel.save(function(e, d) {
			if (e) {
				return res.json({code: 1, msg: '后端出错了'})
			}
			const {name, type, _id} = d;
			res.cookie('userid', _id);
			return res.json({code: 0, data: {type, _id, user: name}})
		})
		// User.create({user, type, pwd:md5Pwd(pwd)}, function(e, d) {
		// 	if (e) {
		// 		return res.json({code: 1, msg: '后端出错了'})
		// 	}
		// 	return res.json({code: 0})
		// })
	})
})

Router.get('/info', function(req, res) {
	const { userid } = req.cookies;
	if (!userid) {
		return res.json({code: 1})
	}
	User.findOne({_id: userid}, _filter, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '后端出错了'})
		}
		if (doc) {
			return res.json({code: 0, data: doc})
		}
	})
})

Router.post('/updatePersonInfo', function(req, res) {
	console.log(req);
	const userid = req.body._id
	const body = req.body;
	User.findByIdAndUpdate(userid, body, function(err, doc) {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body)
		return res.json({code: 0, msg: '修改成功'})
	})
})

/* 2019.4.17 暂时隐藏
Router.get('/getmsglist', function(req, res) {
	const user = req.cookies.userid

	User.find({}, function(e, userdoc) {
		let users = {}
		userdoc.forEach(v=>{
			users[v.id] = {name: v.user, avatar: v.avatar}
		})
		Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc) {
			if (!err) {
				return res.json({code: 0, msgs: doc, users: users})
			}
		})
	})
	
})



Router.post('/readmsg', function(req, res) {
	const userid = req.cookies.userid
	const { from } = req.body
	Chat.update(
		{from, to: userid},
		{'$set': {read: true}},
		{'multi':true},
		function(err, doc) {
			console.log(doc)
			if (!err) {
				return res.json({code: 0, num: doc.nModified})
			}
			return res.json({code: 1, msg: '修改失败'})
		}
	)
})*/

function md5Pwd(pwd) {
	const salt = 'sdfagiomcvasfvnuio@,./';
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
