const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Charge = model.getModel('charge')
// Charge.remove({}, function(e,d){})

Router.get('/getChargeList', function(req, res) {
	// const { charge_type } = req.query
	Charge.find({})
	.populate([
		{path: 'cost_id'},
		{path: 'community_id', select: {community_name: 1}},
		{path: 'building_id', select: {building_name: 1}},
		{path: 'unit_id', select: {unit_name: 1}},
		{path: 'room_id', select: {room_name: 1, user_name: 1}}
	])
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取收费信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取收费信息成功'})
	})
})

Router.post('/addCharge', function(req, res) {
	const userModel = new Charge({...req.body});
	userModel.save(function(e, d) {
		if (e) {
			return res.json({code: 1, msg: '新增收费信息失败'})
		}
		return res.json({code: 0, msg: '新增收费信息成功'})
	})
})

Router.post('/deleteCharge', function(req, res) {
	const { _id } = req.body
	Charge.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除收费信息失败'})
		}
		return res.json({code: 0, msg: '删除收费信息成功'})
	})
})

Router.post('/updateCharge', function(req, res) {
	const { _id } = req.body
	Charge.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改收费信息失败'})
		}
		return res.json({code: 0, msg: '修改收费信息成功'})
	})
})

module.exports = Router