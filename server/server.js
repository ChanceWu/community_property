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
const model = require('./model')
// const Chat = model.getModel('chat')


// 新建app
const app = express()

/* 2019.4.17 暂时隐藏
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
	// console.log('user login')
	socket.on('sendmsg', function(data) {
		// console.log(data)
		// io.emit('recvmsg', data)
		const {from, to, msg} = data
		const chatid = [from, to].sort().join('_')
		Chat.create({chatid, from, to, content: msg}, function(err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})*/

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

/* 2019.4.17 暂时隐藏
server.listen(9090, function() {
	console.log('Node app start at port 9090')
})*/
app.listen(9090, function() {
	console.log('Node app start at port 9090')
})

