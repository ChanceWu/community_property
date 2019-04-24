const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const House = model.getModel('house')

// 获取住宅信息
Router.get('/getHouseInfo', function(req, res) {
	const { user_id } = req.query
	House.find({user_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取住宅信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取住宅信息成功'})
	})
})



module.exports = Router