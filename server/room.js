const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Room = model.getModel('room')

Router.get('/getRoomList', function(req, res) {
	const { unit_id } = req.query
	Room.find({unit_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取房屋信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取房屋信息成功'})
	})
})

Router.get('/getOneRoom', function(req, res) {
	const { _id } = req.query
	Room.findOne({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取房屋信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取房屋信息成功'})
	})
})

Router.post('/addRoom', function(req, res) {
	const userModel = new Room({...req.body});
	userModel.save(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '添加房屋信息失败'})
		}
		return res.json({code: 0, msg: '添加房屋信息成功'})
	})
})

Router.post('/updateRoom', function(req, res) {
	const { _id } = req.body
	Room.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改房屋信息失败'})
		}
		return res.json({code: 0, msg: '修改房屋信息成功'})
	})
})

Router.post('/deleteRoom', function(req, res) {
	const {_id} = req.body
	Room.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除房屋信息失败'})
		}
		return res.json({code: 0, msg: '删除房屋信息成功'})
	})
})



module.exports = Router
