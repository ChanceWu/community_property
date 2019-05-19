const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const UserFamilyMember = model.getModel('user_familymenber')
const Room = model.getModel('room')
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
		let data1 = [], data2 = [], result = []
		User.find({type}).then((doc) => {
			data1 = doc
			let promises = doc.map((v, i)=>{
				return Room.find({user_name: v.name})
			})
			return Promise.all(promises)
		})
		.then((info)=>{
			// console.log(info)
			// console.log(data)
			for (let i=0; i<data1.length; i++) {
				let obj = {}
				Object.assign(obj, JSON.parse(JSON.stringify(data1[i])), JSON.parse(JSON.stringify({roomNum: info[i].length})))
				data2.push(obj)
			}
			return new Promise((resolve, reject)=>{
				resolve(data2)
			})
		})
		.then((data2)=>{
			let promises = data2.map(v=>{
				return UserFamilyMember.find({user_id: v._id})
			})
			return Promise.all(promises)
		})
		.then((info2)=>{
			for (let i=0; i<data2.length; i++) {
				let obj = {}
				Object.assign(obj, JSON.parse(JSON.stringify(data2[i])), JSON.parse(JSON.stringify({familyNum: info2[i].length})))
				result.push(obj)
			}
			return new Promise((resolve, reject)=>{
				resolve(result)
			})
		})
		.then((result)=>{
			return new Promise(()=>{
				return res.json({code: 0, msg: '获取数据成功', data: result})
			})
		})
		.catch((err)=>{
			return res.json({code: 1, msg: '获取数据失败'})
		})
		/*User.find({type}, function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: '获取数据失败'})
			}
			let dataList = await doc.map((v, i)=>{
				Room.find({user_name: v.name}, function(e, d) {
					data[i] =  Object.assign({}, v._doc, {roomNum: d.length})
				})
				console.log(data[i])
				return data[i]
			})
			console.log(dataList)
			return res.json({code: 0, data: doc})
		})*/
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
		return res.json({code: 0, data: doc, msg: '登陆成功'})
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
			return res.json({code: 0, data: {type, _id, user: name, msg: '注册成功'}})
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

Router.post('/deleteOwner', function(req, res) {
	const {_id} = req.body
	UserFamilyMember.remove({user_id:_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除家属信息失败'})
		}
		User.remove({_id}, function(e, d) {
			if (e) {
				return res.json({code: 1, msg: '删除业主信息失败'})
			}
			return res.json({code: 0, msg: '删除业主信息成功'})
		})
	})
})

Router.get('/getOwnerName', function(req, res) {
	const { type } = req.query
	User.find({type}, '_id name', function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取业主名称失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取业主名称成功'})
	})
})

Router.get('/getOwnerNum', function(req, res) {
	User.count({type: 'user'}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取业主总数失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取业主总数成功'})
	})
})

Router.get('/getAdminNum', function(req, res) {
	User.count({type: 'admin'}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取管理员总数失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取管理员总数成功'})
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
