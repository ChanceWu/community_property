const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Complaint = model.getModel('complaint')
// Charge.remove({}, function(e,d){})

Router.get('/getComplaintList', function(req, res) {
	const { value } = req.query
	Complaint.find({
		$or: [
			{'telephone': {'$regex': value, $options: '$i'}},
			{'complaint_category': {'$regex': value, $options: '$i'}},
			{'complaint_status': {'$regex': value, $options: '$i'}},
			{'complaint_content': {'$regex': value, $options: '$i'}}
		]
	})
	.populate([
		{path: 'user_id', select: {name: 1}},
		{path: 'community_id', select: {community_name: 1}},
		{path: 'building_id', select: {building_name: 1}},
		{path: 'unit_id', select: {unit_name: 1}},
		{path: 'room_id', select: {room_name: 1, user_name: 1}}
	])
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取投诉信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取投诉信息成功'})
	})
})

Router.post('/addComplaint', function(req, res) {
	const userModel = new Complaint({...req.body});
	userModel.save(function(e, d) {
		if (e) {
			return res.json({code: 1, msg: '新增投诉信息失败'})
		}
		return res.json({code: 0, msg: '新增投诉信息成功'})
	})
})

Router.post('/deleteComplaint', function(req, res) {
	const { _id } = req.body
	Complaint.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除投诉信息失败'})
		}
		return res.json({code: 0, msg: '删除投诉信息成功'})
	})
})

Router.post('/updateComplaint', function(req, res) {
	const { _id } = req.body
	Complaint.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改投诉信息失败'})
		}
		return res.json({code: 0, msg: '修改投诉信息成功'})
	})
})

Router.get('/getComplaintByUser', function(req, res) {
	const { user_id, value } = req.query
	Complaint.find({
		user_id,
		$or: [
			{'telephone': {'$regex': value, $options: '$i'}},
			{'complaint_category': {'$regex': value, $options: '$i'}},
			{'complaint_status': {'$regex': value, $options: '$i'}},
			{'complaint_content': {'$regex': value, $options: '$i'}}
		]
	})
	.populate([
		{path: 'user_id', select: {name: 1}},
		{path: 'community_id', select: {community_name: 1}},
		{path: 'building_id', select: {building_name: 1}},
		{path: 'unit_id', select: {unit_name: 1}},
		{path: 'room_id', select: {room_name: 1, user_name: 1}}
	])
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取投诉信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取投诉信息成功'})
	})
})

module.exports = Router