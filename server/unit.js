const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Unit = model.getModel('unit')
// Unit.remove({}, function(e,d){})

Router.get('/getUnitList', function(req, res) {
	const { building_id } = req.query
	Unit.find({building_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取单元信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取单元信息成功'})
	})
})

Router.post('/addUnit', function(req, res) {
	const userModel = new Unit({...req.body});
	userModel.save(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '添加单元信息失败'})
		}
		return res.json({code: 0, msg: '添加单元信息成功'})
	})
})

Router.post('/updateUnit', function(req, res) {
	const { _id } = req.body
	Unit.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改单元信息失败'})
		}
		return res.json({code: 0, msg: '修改单元信息成功'})
	})
})

Router.post('/deleteUnit', function(req, res) {
	const {_id} = req.body
	Unit.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除单元信息失败'})
		}
		return res.json({code: 0, msg: '删除单元信息成功'})
	})
})

Router.get('/getUnitName', function(req, res) {
	const {building_id} = req.query
	Unit.find({building_id}, '_id unit_name', function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取单元名称失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取单元名称成功'})
	})
})

module.exports = Router
