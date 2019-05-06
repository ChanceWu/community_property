const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const UserFamilyMember = model.getModel('user_familymenber')


Router.get('/list', function(req, res) {

	const {type, _id} = req.query
	if (type) {
		UserFamilyMember.find({type}, function(err, doc) {
			return res.json({code: 0, data: doc})
		})
	}else if (_id) {
		UserFamilyMember.findOne({_id}, function(err, doc) {
			return res.json({code: 0, data: doc})
		})
	} else {
		UserFamilyMember.find({}, function(err, doc) {
			return res.json({code: 0, data: doc})
		})
	}
	
})

Router.post('/addFamilyMember', function(req, res) {
	// const {user_id, ...data} = req.body;\
	console.log(req.body)
	const userModel = new UserFamilyMember(req.body);
	userModel.save(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '新增家属信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '新增家属信息成功'})
	})
})

Router.get('/getFamilyMember', function(req, res) {
	const { user_id } = req.query
	UserFamilyMember.find({user_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取家属信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取家属信息成功'})
	})
})

Router.post('/deleteFamilyMember', function(req, res) {
	const { _id } = req.body
	UserFamilyMember.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除家属信息失败'})
		}
		return res.json({code: 0, msg: '删除家属信息成功'})
	})
})

Router.post('/updateFamilyMember', function(req, res) {
	const { _id } = req.body
	UserFamilyMember.findByIdAndUpdate(_id, req.body, function(err, doc) {
		const data = Object.assign({}, {
			user_id: doc.user_id
		}, req.body)
		if (err) {
			return res.json({code: 1, msg: '删除家属信息失败'})
		}
		return res.json({code: 0, data, msg: '删除家属信息成功'})
	})
})

Router.get('/getFamilyMemberNum', function(req, res) {
	const { user_id } = req.query
	UserFamilyMember.count({user_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取家属总数失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取家属总数成功'})
	})
})


module.exports = Router