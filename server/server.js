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

/* 2019.4.17 暂时隐藏
server.listen(9090, function() {
	console.log('Node app start at port 9090')
})*/
app.listen(9090, function() {
	console.log('Node app start at port 9090')
})

