import React from 'react'
import { Input, Button, Radio, message, Breadcrumb, Select } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOneRoom, updateRoom } from '../../actions/room'
import { getOwnerName } from '../../actions/admininfo'
import './form.less'

const RadioGroup = Radio.Group;
const Option = Select.Option;

@connect(
	state=>({
		room: state.room,
		admininfo: state.admininfo,
	}), {
		getOneRoom,
		updateRoom,
		getOwnerName,
	}
)
class RoomInfoForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentRoomrId: this.props.match.params.id,
			data: {
				room_name: '',
				door_model:'',
				room_toward: '',
				room_decorate: '',
				room_floor: '',
				constructor_area: '',
				using_area: '',
				license_plate_num: '',
				garage_area: '',
				parking_num: '',
				parking_area: '',
				store_room: '',
				storage_area: '',
				attic_area: '',
				room_status: '',
				property_type: '',
				room_nature: '',
				note: '',
				user_name: '',
			},
			// members: []
		}
	}
	componentDidMount() {
		console.log(this.props)
		this.getOneRoom()
		this.getOwnerName()
	}
	roomInfoFormChange = (key, val) => {
		const { data } = this.state
		data[key] = val
		this.setState({
			data: {...data}
		})
	}
	getOneRoom = () => {
		this.props.getOneRoom(this.state.currentRoomrId).then(()=>{
			this.setState({
				data: {...this.props.room.oneroom}
			})
		})
	}
	updateRoomInfo = () => {
		this.props.updateRoom(this.state.data).then(()=>{
			message.success(this.props.room.msg)
			this.getOneRoom()
		})
	}
	getOwnerName = () => {
		this.props.getOwnerName()
	}
	render() {
		const data = this.state.data
		/*const routes = [{
		  path: 'index',
		  breadcrumbName: '首页'
		}, {
		  path: 'first',
		  breadcrumbName: '一级面包屑'
		}, {
		  path: 'second',
		  breadcrumbName: '当前页面'
		}];
		function itemRender(route, params, routes, paths) {
		  const last = routes.indexOf(route) === routes.length - 1;
		  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
		}*/
		return (
			<div>
				{/*<Breadcrumb itemRender={itemRender} routes={routes}/>*/}
				<div className="management">
					<Button className="management_button" type="primary" onClick={this.updateRoomInfo}>保存</Button>
					<Button className="management_button" onClick={()=>{this.props.history.goBack()}}>返回</Button>
					<div className="form">
						<div className="form-row">
							<div className="label">户主人:</div>
							<Select
							    showSearch
							    // style={{ width: 236 }}
							    value={data.user_name}
							    onChange={v=>this.roomInfoFormChange('user_name', v)}
							    // defaultValue={{key: ''}}
							    placeholder="请选择户型"
							    optionFilterProp="children"
							    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						  	>
							    {
							    	this.props.admininfo.ownername&&
							    	this.props.admininfo.ownername.map(v=><Option key={v._id} value={v.name}>{v.name}</Option>)
							    }
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">房间名称:</div>
							<Input value={data.room_name} onChange={v=>this.roomInfoFormChange('room_name', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">户型:</div>
							<Select
							    showSearch
							    // style={{ width: 236 }}
							    value={data.door_model}
							    onChange={v=>this.roomInfoFormChange('door_model', v)}
							    // defaultValue={{key: ''}}
							    placeholder="请选择户型"
							    optionFilterProp="children"
							    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						  	>
							    <Option value="二室一厅">二室一厅</Option>
							    <Option value="三室一厅">三室一厅</Option>
							    <Option value="二室二厅">二室二厅</Option>
							    <Option value="三室二厅">三室二厅</Option>
							    <Option value="一室一厅">一室一厅</Option>
							    <Option value="一室一卫">一室一卫</Option>
							    <Option value="独立开间">独立开间</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">朝向:</div>
							<Select
							    showSearch
							    value={data.room_toward}
							    onChange={v=>this.roomInfoFormChange('room_toward', v)}
							    placeholder="请选择朝向"
							    optionFilterProp="children"
							    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						  	>
							    <Option value="坐西朝东">坐西朝东</Option>
							    <Option value="坐东朝西">坐东朝西</Option>
							    <Option value="坐南朝北">坐南朝北</Option>
							    <Option value="坐北朝南">坐北朝南</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">装修:</div>
							<Select
							    showSearch
							    value={data.room_decorate}
							    onChange={v=>this.roomInfoFormChange('room_decorate', v)}
							    placeholder="请选择装修类型"
							    optionFilterProp="children"
							    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						  	>
							    <Option value="简装">简装</Option>
							    <Option value="精装">精装</Option>
							    <Option value="豪华">豪华</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">楼层:</div>
							<Input value={data.room_floor} onChange={v=>this.roomInfoFormChange('room_floor', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">建筑面积:</div>
							<Input value={data.constructor_area} onChange={v=>this.roomInfoFormChange('constructor_area', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">使用面积:</div>
							<Input value={data.using_area} onChange={v=>this.roomInfoFormChange('using_area', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">车牌号:</div>
							<Input value={data.license_plate_num} onChange={v=>this.roomInfoFormChange('license_plate_num', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">车库面积:</div>
							<Input value={data.garage_area} onChange={v=>this.roomInfoFormChange('garage_area', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">车位号:</div>
							<Input value={data.parking_num} onChange={v=>this.roomInfoFormChange('parking_num', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">车位面积:</div>
							<Input value={data.parking_area} onChange={v=>this.roomInfoFormChange('parking_area', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">储藏室:</div>
							<Input value={data.store_room} onChange={v=>this.roomInfoFormChange('store_room', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">储藏室面积:</div>
							<Input value={data.storage_area} onChange={v=>this.roomInfoFormChange('storage_area', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">阁楼面积:</div>
							<Input value={data.attic_area} onChange={v=>this.roomInfoFormChange('attic_area', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">房间状态:</div>
							<Select
							    showSearch
							    value={data.room_status}
							    onChange={v=>this.roomInfoFormChange('room_status', v)}
							    placeholder="请选择房间状态"
						  	>
						  		<Option value="待售">待售</Option>
							    <Option value="已售">已售</Option>
							    <Option value="已租">已租</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">物业类型:</div>
							<Select
							    showSearch
							    value={data.property_type}
							    onChange={v=>this.roomInfoFormChange('property_type', v)}
							    placeholder="请选择物业类型"
							    optionFilterProp="children"
							    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						  	>
							    <Option value="A类-标准">A类-标准</Option>
							    <Option value="B类-贵宾">B类-贵宾</Option>
							    <Option value="C类-免缴费">C类-免缴费</Option>
							    <Option value="D类-自用">D类-自用</Option>
							    <Option value="E类-其他">E类-其他</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">房间性质:</div>
							<Select
							    showSearch
							    value={data.room_nature}
							    onChange={v=>this.roomInfoFormChange('room_nature', v)}
							    placeholder="请选择房间性质"
							    optionFilterProp="children"
							    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						  	>
							    <Option value="公产">公产</Option>
							    <Option value="私产">私产</Option>
							    <Option value="半公产半私产">半公产半私产</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">备注:</div>
							<Input value={data.note} onChange={v=>this.roomInfoFormChange('note', v.target.value)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RoomInfoForm