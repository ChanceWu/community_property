const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Repair = model.getModel('repair')
// Charge.remove({}, function(e,d){})

Router.get('/getRepairList', function(req, res) {
	// const { charge_type } = req.query
	Repair.find({})
	.populate([
		{path: 'user_id', select: {name: 1}},
		{path: 'community_id', select: {community_name: 1}},
		{path: 'building_id', select: {building_name: 1}},
		{path: 'unit_id', select: {unit_name: 1}},
		{path: 'room_id', select: {room_name: 1, user_name: 1}}
	])
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取维修信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取维修信息成功'})
	})
})

Router.post('/addRepair', function(req, res) {
	const userModel = new Repair({...req.body});
	userModel.save(function(e, d) {
		if (e) {
			return res.json({code: 1, msg: '新增维修信息失败'})
		}
		return res.json({code: 0, msg: '新增维修信息成功'})
	})
})

Router.post('/deleteRepair', function(req, res) {
	const { _id } = req.body
	Repair.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除维修信息失败'})
		}
		return res.json({code: 0, msg: '删除维修信息成功'})
	})
})

Router.post('/updateRepair', function(req, res) {
	const { _id } = req.body
	Repair.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改维修信息失败'})
		}
		return res.json({code: 0, msg: '修改维修信息成功'})
	})
})

Router.get('/getRepairByUser', function(req, res) {
	const { user_id } = req.query
	Repair.find({user_id})
	.populate([
		{path: 'user_id', select: {name: 1}},
		{path: 'community_id', select: {community_name: 1}},
		{path: 'building_id', select: {building_name: 1}},
		{path: 'unit_id', select: {unit_name: 1}},
		{path: 'room_id', select: {room_name: 1, user_name: 1}}
	])
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取维修信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取维修信息成功'})
	})
})

module.exports = Router