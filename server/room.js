const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Room = model.getModel('room')
// Room.remove({}, function(e,d){})

Router.get('/getRoomList', function(req, res) {
	const { unit_id } = req.query
	Room.find({unit_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取房屋信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取房屋信息成功'})
	})
})

// 获取id指定的房屋信息
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

// 获取user_name指定的房屋信息
Router.get('/getRoomByUser', function(req, res) {
	const { user_name } = req.query
	Room.find({user_name})
	.populate({
		path: 'unit_id',
		select: {unit_name: 1},
		populate: {
			path: 'building_id',
			select: {building_name: 1},
			populate: {
				path: 'community_id',
				select: {community_name: 1},
			}
		}
	})
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取房屋信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取房屋信息成功'})
	})
})

Router.get('/getRoomName', function(req, res) {
	const {unit_id} = req.query
	Room.find({unit_id}, '_id room_name', function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取房屋名称失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取房屋名称成功'})
	})
})

Router.get('/getRoomNum', function(req, res) {
	const { user_name } = req.query
	if (user_name) {
		Room.count({user_name}, function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: '获取房屋总数失败'})
			}
			return res.json({code: 0, data: doc, msg: '获取房屋总数成功'})
		})
	} else {
		Room.count({}, function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: '获取房屋总数失败'})
			}
			return res.json({code: 0, data: doc, msg: '获取房屋总数成功'})
		})
	}
	
})

module.exports = Router
