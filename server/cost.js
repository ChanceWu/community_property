const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Cost = model.getModel('cost')
// Cost.remove({}, function(e,d){})

Router.get('/getCostList', function(req, res) {
	const { charge_type } = req.query
	Cost.find({charge_type}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取费用信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取费用信息成功'})
	})
})

Router.post('/addCost', function(req, res) {
	const { charge_num } = req.body
	Cost.findOne({charge_num}, function(err, doc) {
		if (doc) {
			return res.json({code: 1, msg: '用户名重复'})
		}
		const userModel = new Cost({...req.body});
		userModel.save(function(e, d) {
			if (e) {
				return res.json({code: 1, msg: '新增费用信息失败'})
			}
			return res.json({code: 0, msg: '新增费用信息成功'})
		})
	})
})

Router.post('/deleteCost', function(req, res) {
	const { _id } = req.body
	Cost.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除费用信息失败'})
		}
		return res.json({code: 0, msg: '删除费用信息成功'})
	})
})

Router.post('/updateCost', function(req, res) {
	const { _id } = req.body
	Cost.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改费用信息失败'})
		}
		return res.json({code: 0, msg: '修改费用信息成功'})
	})
})

Router.get('/getCostName', function(req, res) {
	Cost.find({}, '_id charge_name', function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取费用名称失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取费用名称成功'})
	})
})


module.exports = Router
