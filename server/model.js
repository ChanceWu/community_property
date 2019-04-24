const mongoose = require('mongoose')
// 连接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/community-property'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
	console.log('mongo connect success')
})

const models = {
	// 用户信息 管理员和住户
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
	},
	// 户主家属信息
	user_familymenber: {
		// 户主id
		user_id: {'type': String, 'require': true},
		// 姓名
		'name': {'type': String, 'require': true},
		// 与户主关系
		'relationship': {'type': String},
		// 电话号码
		'telephone': {'type': String},
		// 性别
		'gender': {'type': Boolean, 'require': true},
		// 年龄
		'age': {'type': String},
	},
	// 房屋信息
	house: {
		// 户主id
		user_id: {'type': String, 'require': true},
		// 房产（门牌号）
		'address': {'type': String, 'require': true},
		// 使用状态 true自住 false空置
		'status': {'type': Boolean, 'default': false},
		// 入住时间
		'Check_in_time': {'type': Boolean, 'require': true},
		// 认购证号
		'Subscription_card_number': {'type': String, 'require': true},
		// 认购证号
		'Subscription_card_number': {'type': String, 'require': true},
	},
	// 小区
	community: {
		// 小区名称
		community_name: {'type': String, 'require': true},
		// 所属公司
		company: {'type': String, 'require': true},
		// 占地面积
		cover_area: {'type': String, 'require': true},
		// 绿地面积
		green_area: {'type': String, 'require': true},
		// 建筑面积
		construction_area: {'type': String, 'require': true},
		// 道路面积
		road_area: {'type': String, 'require': true},
		// 负责人
		admin_id: {'type': String, 'require': true},
		// 地址
		community_address: {'type': String, 'require': true},
	},
	// 楼栋
	building: {
		// 小区id
		community_id: {'type': String, 'require': true},
		// 楼号
		building_name: {'type': String, 'require': true},
		// 楼宇功能
		building_function: {'type': String, 'require': true},
		// 结构类别
		structure_category: {'type': String, 'require': true},
		// 装修标准
		decorate_standard: {'type': String, 'require': true},
		// 使用面积
		using_area: {'type': String, 'require': true},
		// 建筑面积
		construction_area: {'type': String, 'require': true},
		// 建筑许可证
		building_permit: {'type': String, 'require': true},
		// 预售许可证
		presale_permit: {'type': String, 'require': true},
		// 竣工日期
		completion_date: {'type': String, 'require': true},
		// 封顶日期
		cap_date: {'type': String, 'require': true},
		// 备注
		note: {'type': String, 'require': true},
	},
	// 单元
	unit: {
		// 楼栋id
		building_id: {'type': String, 'require': true},
		// 单元号
		building_id: {'type': String, 'require': true},
		// 开始楼层
		building_id: {'type': String, 'require': true},
		// 结束楼层
		building_id: {'type': String, 'require': true},
		// 开始房号
		building_id: {'type': String, 'require': true},
		// 结束房号
		building_id: {'type': String, 'require': true},
		// 备注
		building_id: {'type': String, 'require': true},
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