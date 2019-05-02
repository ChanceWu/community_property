const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Building = model.getModel('building')
// Building.remove({}, function(e,d){})

Router.get('/getBuildingList', function(req, res) {
	const { community_id } = req.query
	Building.find({community_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取楼栋信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取楼栋信息成功'})
	})
})

Router.post('/addBuilding', function(req, res) {
	const userModel = new Building({...req.body});
	userModel.save(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '添加楼栋信息失败'})
		}
		return res.json({code: 0, msg: '添加楼栋信息成功'})
	})
})

Router.post('/updateBuilding', function(req, res) {
	const { _id } = req.body
	Building.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改楼栋信息失败'})
		}
		return res.json({code: 0, msg: '修改楼栋信息成功'})
	})
})

Router.post('/deleteBuilding', function(req, res) {
	const {_id} = req.body
	Building.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除楼栋信息失败'})
		}
		return res.json({code: 0, msg: '删除楼栋信息成功'})
	})
})

Router.get('/getBuildingName', function(req, res) {
	const {community_id} = req.query
	Building.find({community_id}, '_id building_name', function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取楼栋名称失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取楼栋名称成功'})
	})
})


module.exports = Router
