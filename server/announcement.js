const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Announcement = model.getModel('announcement')
const Announcement_read = model.getModel('announcement_read')
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

Router.get('/getAnnouncement_read', function(req, res) {
	const { user_id } = req.query
	Announcement_read.find({user_id}, function(err, doc) {
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

Router.get('/getAnnouncementListByStatus', function(req, res) {
	const { status } = req.query
	Announcement.find({status: status}, function(err, doc) {
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
	const { _id, status } = req.body
	Announcement.findByIdAndUpdate(_id, req.body, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '修改公告信息失败'})
		}
		if (status==='已发布') {
			User.find({type: 'user'}).then((doc) => {
				data1 = doc
				let promises = doc.map((v, i)=>{
					return Announcement_read.create({user_id: v._id, announcement_id: _id, read: false})
				})
				return Promise.all(promises)
			})
			.then((result)=>{
				// console.log(result)
				// console.log(data)
				return new Promise((resolve, reject)=>{
					resolve(result)
				})
			})
			.then((result)=>{
				return new Promise(()=>{
					return res.json({code: 0, msg: '公告发布成功', data: result})
				})
			})
			.catch((err)=>{
				return res.json({code: 1, msg: '公告发布失败'})
			})
		} else if (status==='停用') {
			Announcement_read.remove({announcement_id: _id}, function(err, doc) {
				if (err) {
					return res.json({code: 1, msg: '停用该公告失败'})
				}
				return res.json({code: 0, msg: '停用该公告成功'})
			})
		}
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

Router.post('/readAnnouncement', function(req, res) {
	const { user_id } = req.body
	Announcement_read.update(
		{user_id},
		{'$set': {read: true}},
		{'multi':true},
		function(err, doc) {
			console.log(doc)
			if (!err) {
				return res.json({code: 0, num: doc.nModified})
			}
			return res.json({code: 1, msg: '修改失败'})
		}
	)
})

module.exports = Router