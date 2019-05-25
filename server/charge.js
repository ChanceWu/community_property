const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Charge = model.getModel('charge')
const Room = model.getModel('room')
// Charge.remove({}, function(e,d){})

Router.get('/getChargeList', function(req, res) {
	const { value } = req.query
	Charge.find({
		$or: [
			{'charge_unit': {'$regex': value, $options: '$i'}}
		]
	})
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

Router.get('/getChargeByUser', function(req, res) {
	const { user_name, value } = req.query
	Room.find({
		user_name,
		$or: [
			{'room_name': {'$regex': value, $options: '$i'}}
		]
	}, '_id')
	.then((doc)=>{
		let promises = doc.map(v=>{
			return Charge.find({room_id: v._id})
					.populate([
						{path: 'cost_id'},
						{path: 'community_id', select: {community_name: 1}},
						{path: 'building_id', select: {building_name: 1}},
						{path: 'unit_id', select: {unit_name: 1}},
						{path: 'room_id', select: {room_name: 1, user_name: 1}}
					])
		})
		return Promise.all(promises)
	})
	.then((info)=>{
		return new Promise(()=>{
			return res.json({code: 0, data: info, msg: '获取收费信息成功'})
		})
	})
	.catch((err)=>{
		return res.json({code: 1, msg: '获取收费信息失败'})
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

Router.get('/getChargeMoney', function(req, res) {
	const { user_name } = req.query
	Room.find({user_name}, '_id')
	.then((doc)=>{
		let promises = doc.map(v=>{
			return Charge.find({room_id: v._id})
					.populate([
						{path: 'cost_id', select: {unit_price: 1, charge_name: 1}}
					])
					.select('charge_unit')
		})
		return Promise.all(promises)
	})
	.then((info)=>{
		return new Promise(()=>{
			return res.json({code: 0, data: info, msg: '获取收费信息成功'})
		})
	})
	.catch((err)=>{
		return res.json({code: 1, msg: '获取收费信息失败'})
	})
})

module.exports = Router