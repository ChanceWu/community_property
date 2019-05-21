const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Announcement = model.getModel('announcement')
// Charge.remove({}, function(e,d){})

Router.get('/getAnnouncementList', function(req, res) {
	// const { charge_type } = req.query
	Announcement.find({}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取公告信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取公告信息成功'})
	})
})

// 获取id指定的公告信息
Router.get('/getOneAnnouncement', function(req, res) {
	const { _id } = req.query
	Announcement.findOne({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取公告信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取公告信息成功'})
	})
})

Router.post('/addAnnouncement', function(req, res) {
	const userModel = new Announcement({...req.body});
	userModel.save(function(e, d) {
		if (e) {
			return res.json({code: 1, msg: '新增公告信息失败'})
		}
		return res.json({code: 0, msg: '新增公告信息成功'})
	})
})

Router.post('/deleteAnnouncement', function(req, res) {
	const { _id } = req.body
	Announcement.remove({_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '删除公告信息失败'})
		}
		return res.json({code: 0, msg: '删除公告信息成功'})
	})
})

Router.post('/updateAnnouncement', function(req, res) {
	const { _id } = req.body
	Announcement.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改公告信息失败'})
		}
		return res.json({code: 0, msg: '修改公告信息成功'})
	})
})

Router.get('/getAnnouncementByUser', function(req, res) {
	const { user_id } = req.query
	Announcement.find({user_id}, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '获取公告信息失败'})
		}
		return res.json({code: 0, data: doc, msg: '获取公告信息成功'})
	})
})

module.exports = Router