const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Community = model.getModel('community')

Router.get('/getCommunityList', function(req, res) {
	const { value } = req.query
	Community.find({
		$or: [
			{'community_name': {'$regex': value, $options: '$i'}},
			{'company': {'$regex': value, $options: '$i'}},
			{'admin_id': {'$regex': value, $options: '$i'}},
			{'community_address': {'$regex': value, $options: '$i'}}
		]
	})
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取小区信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取小区信息成功'})
	})
})

Router.post('/addCommunity', function(req, res) {
	const userModel = new Community({...req.body});
	userModel.save(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '添加小区信息失败'})
		}
		return res.json({code: 0, msg: '添加小区信息成功'})
	})
})

Router.post('/updateCommunity', function(req, res) {
	const { _id } = req.body
	Community.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改小区信息失败'})
		}
		return res.json({code: 0, msg: '修改小区信息成功'})
	})
})

Router.post('/deleteCommunity', function(req, res) {
	const {_id} = req.body
	Community.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除小区信息失败'})
		}
		return res.json({code: 0, msg: '删除小区信息成功'})
	})
})

Router.get('/getCommunityName', function(req, res) {
	Community.find({}, '_id community_name', function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取小区名称失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取小区名称成功'})
	})
})


module.exports = Router
