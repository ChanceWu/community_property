const mongoose = require('mongoose')
// 连接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/community-property'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
	console.log('mongo connect success')
})

const models = {
	user: {
		// 姓名
		'name': {'type': String, 'require': true},
		// 密码
		'pwd': {'type': String, 'require': true},
		// 身份
		'type': {'type': String, 'require': true},
		// 电话号码
		'telephone': {'type': String, 'require': true},
		// 身份证号码
		'idnumber': {'type': String, 'require': true},
		// 性别
		'gender': {'type': Boolean, 'default': true},
		// 年龄
		'age': {'type': String},
		// 籍贯
		'nativeplace': {'type': String},
	}
	/* 2019.4.17 暂时隐藏
	,
	chat: {
		'chatid':{'type': String, 'require': true},
		'from':{'type': String, 'require': true},
		'to':{'type': String, 'require': true},
		'read':{'type': Boolean, 'default': false},
		'content':{'type': String, 'require': true, 'default': ''},
		'create_time':{'type': Number, 'default': new Date().getTime()},
	}*/
}

for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name)
	}
}