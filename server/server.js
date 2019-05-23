const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const UserRouter = require('./user')
const UserFamilyMemberRouter = require('./user_familymenber')
const HouseRouter = require('./house')
const CommunityRouter = require('./community')
const Building = require('./building')
const Unit = require('./unit')
const Room = require('./room')
const Cost = require('./cost')
const Charge = require('./charge')
const Garage = require('./garage')
const Repair = require('./repair')
const Complaint = require('./complaint')
const Pay = require('./pay')
const Announcement = require('./announcement')
const model = require('./model')
const User = model.getModel('user')
const announcement = model.getModel('announcement')
const Announcement_read = model.getModel('announcement_read')


// 新建app
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
	// console.log('user login')
	socket.on('sendAnnouncement', function(data) {
		const { _id, status } = data
		// io.emit('recvmsg', data) 
		// const {from, to, msg} = data
		announcement.findByIdAndUpdate(_id, data, function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: '修改公告信息失败'})
			}
			if (status==='已发布') {
				User.find({type: 'user'}).then((doc) => {
					let promises = doc.map((v, i)=>{
						return Announcement_read.create({user_id: v._id, announcement_id: _id, read: false})
					})
					return Promise.all(promises)
				})
				.then((result)=>{
					return new Promise((resolve, reject)=>{
						resolve(result)
					})
				})
				.then((result)=>{
					return new Promise(()=>{
						return io.emit('recvAnnouncement', {code: 0, msg: '公告发布成功', data: result})
					})
				})
				.catch((err)=>{
					return io.emit('recvAnnouncement', {code: 1, msg: '公告发布失败'})
				})
			}
		})
		// const chatid = [from, to].sort().join('_')
		/*Announcement_read.create({chatid, from, to, content: msg}, function(err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})*/
	})
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', UserRouter)
app.use('/user_familymember', UserFamilyMemberRouter)
app.use('/house', HouseRouter)
app.use('/community', CommunityRouter)
app.use('/building', Building)
app.use('/unit', Unit)
app.use('/room', Room)
app.use('/cost', Cost)
app.use('/charge', Charge)
app.use('/garage', Garage)
app.use('/repair', Repair)
app.use('/complaint', Complaint)
app.use('/pay', Pay)
app.use('/announcement', Announcement)

/* 2019.4.17 暂时隐藏
server.listen(9090, function() {
	console.log('Node app start at port 9090')
})*/
server.listen(9090, function() {
	console.log('Node app start at port 9090')
})

