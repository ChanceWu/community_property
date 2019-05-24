const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Garage = model.getModel('garage')

Router.get('/getGarageList', function(req, res) {
	const { value } = req.query
	/*Garage.find({value}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取车位信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取车位信息成功'})
	})*/
	Garage.find({
		$or: [
			{'garage_num': {'$regex': value, $options: '$i'}},
			{'user_name': {'$regex': value, $options: '$i'}},
			{'community_name': {'$regex': value, $options: '$i'}},
			{'garage_state': {'$regex': value, $options: '$i'}},
			{'garage_category': {'$regex': value, $options: '$i'}},
			{'manage_category': {'$regex': value, $options: '$i'}},
			{'garage_type': {'$regex': value, $options: '$i'}}
		]
	})
	.exec(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取车位信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取车位信息成功'})
	})
})

Router.post('/addGarage', function(req, res) {
	const userModel = new Garage({...req.body});
	userModel.save(function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '添加车位信息失败'})
		}
		return res.json({code: 0, msg: '添加车位信息成功'})
	})
})

Router.post('/updateGarage', function(req, res) {
	const { _id } = req.body
	Garage.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改车位信息失败'})
		}
		return res.json({code: 0, msg: '修改车位信息成功'})
	})
})

Router.post('/deleteGarage', function(req, res) {
	const {_id} = req.body
	Garage.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除车位信息失败'})
		}
		return res.json({code: 0, msg: '删除车位信息成功'})
	})
})

Router.get('/getGarageByUser', function(req, res) {
	const { user_name } = req.query
	Garage.find({user_name}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取车位信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取车位信息成功'})
	})
})

Router.get('/getGarageNum', function(req, res) {
	const { user_name } = req.query
	if (user_name) {
		Garage.count({user_name}, function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: '获取车位总数失败'})
			}
			return res.json({code: 0, data: doc, msg: '获取车位总数成功'})
		})
	} else {
		Garage.count({}, function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: '获取车位总数失败'})
			}
			return res.json({code: 0, data: doc, msg: '获取车位总数成功'})
		})
	}
	
})

module.exports = Router
