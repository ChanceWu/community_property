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
		note: {'type': String},
	},
	// 单元
	unit: {
		// 楼栋id
		building_id: {'type': String, 'require': true},
		// 单元号
		unit_name: {'type': String, 'require': true},
		// 开始楼层
		begin_floor: {'type': String, 'require': true},
		// 结束楼层
		end_floor: {'type': String, 'require': true},
		// 开始房号
		start_num: {'type': String, 'require': true},
		// 结束房号
		end_num: {'type': String, 'require': true},
		// 备注
		note: {'type': String},
	},
	// 房间
	room: {
		// 单元id
		unit_id: {'type': String, 'require': true},
		// 房间名称
		room_name: {'type': String, 'require': true},
		// 户型
		door_model: {'type': String},
		// 朝向
		room_toward: {'type': String},
		// 装修
		room_decorate: {'type': String},
		// 楼层
		room_floor: {'type': String},
		// 建筑面积
		constructor_area: {'type': String},
		// 使用面积
		using_area: {'type': String},
		// 车牌号
		license_plate_num: {'type': String},
		// 车库面积
		garage_area: {'type': String},
		// 车位号
		parking_num: {'type': String},
		// 车位面积
		parking_area: {'type': String},
		// 储藏室
		store_room: {'type': String},
		// 储藏室面积
		storage_area: {'type': String},
		// 阁楼面积
		attic_area: {'type': String},
		// 房间状态
		room_status: {'type': String},
		// 物业类型
		property_type: {'type': String},
		// 房间性质
		room_nature: {'type': String},
		// 备注
		note: {'type': String},
	},
	// 费用种类
	cost: {
		// 物业公司
		company: {'type': String, 'require': true},
		// 费用编号
		charge_num: {'type': String, 'require': true},
		// 费用名称
		charge_name: {'type': String, 'require': true},
		// 收费方式
		charge_way: {'type': String, 'require': true},
		// 单位价格
		unit_price: {'type': String, 'require': true},
		// 收费周期
		charge_cycle: {'type': String, 'require': true},
		// 滞纳金比率‰
		charge_late: {'type': String, 'require': true},
		// 超过天数
		over_day: {'type': String, 'require': true},
		// 类型 常规费用 公摊费用
		charge_type: {'type': String, 'require': true},
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