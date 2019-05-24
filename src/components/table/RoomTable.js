import React from 'react'
import { Table, Button, Form, Tag, Divider, message } from 'antd';
import { connect } from 'react-redux'
import { getRoomList, addRoom, updateRoom, deleteRoom } from '../../actions/room'
import RoomModal from '../modal/RoomModal'
import SearchButton from '../button/SearchButton'

@connect(
	state=>state.room,
	{
		getRoomList,
		addRoom,
		updateRoom,
		deleteRoom,
	}
)
class RoomTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			unit_id: this.props.match.params.id,
			visible: false,
			isAdd: true,
			data: '',
			defaultData: '',
		}
	}
	componentDidMount() {
		this.getRoomList()
	}

	getRoomList = () => {
		this.props.getRoomList(this.state.unit_id).then(()=>{
			this.setState({
				data: this.props.room
			})
		})
	}

	addRoom = (values) => {
		this.props.addRoom({unit_id: this.state.unit_id, ...values}).then(()=>{
			message.success(this.props.msg)
			this.getRoomList()
		})
	}

	updateRoom = (values) => {
		this.props.updateRoom(values).then(()=>{
			message.success(this.props.msg)
			this.getRoomList()
		})
	}

	deleteRoom = (_id) => {
		this.props.deleteRoom(_id).then(()=>{
			message.success(this.props.msg)
			this.getRoomList()
		})
	}

	showAddModal = () => {
	    this.setState({
	      	visible: true,
	      	isAdd: true,
	      	defaultData: '',
	    });
  	}

  	showUpdateModal = (record) => {
	    this.setState({
	      	visible: true,
	      	isAdd: false,
	      	defaultData: {...record},
	    });
  	}

  	handleAddOk = (e) => {
	    this.props.form.validateFields((err, values) => {
        	if (!err) {
        		const data = Object.assign({}, values, {user_name: ''})
          		this.addRoom(data)
          		this.setState({
			      	visible: false,
			    });
        	}
      	});
  	}
  	handleUpdateOk = (e) => {
  		this.props.form.validateFields((err, values) => {
  			// values中并没有_id值，因此需要在参数中添加参数
  			const data = Object.assign({},values,{_id: this.state.defaultData.key, user_name: ''})
  			if (!err) {
  				this.updateRoom(data)
  				this.setState({
  					visible: false,
  				})
  			}
  		})
  	}

  	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      	visible: false,
	    });
  	}
  	handleSearch = (value) => {
		this.props.getRoomList(this.state.unit_id, value).then(()=>{
			this.setState({
				data: this.props.room
			})
		})
	}
  	render() {
  		const columns = [
		  	{
		    	title: '房间名称',
		    	width: 100,
		    	dataIndex: 'room_name',
		    	key: 'room_name',
		    	render: (text, record) => (
		    		<a onClick={()=>{this.props.history.push(`/admin/house/roominfoform/${record.key}`)}}>{text}</a>
		    	)
		  	},
		  	{
		  		title: '业主', width: 100, dataIndex: 'user_name', key: 'user_name'
		  	},
		  	{ title: '户型', dataIndex: 'door_model', key: 'door_model' },
		  	{ title: '楼层', dataIndex: 'room_floor', key: 'room_floor' },
		  	{ title: '建筑面积', dataIndex: 'constructor_area', key: 'constructor_area' },
		  	{ title: '使用面积', dataIndex: 'using_area', key: 'using_area' },
		  	{
		  		title: '房间状态', dataIndex: 'room_status', key: 'room_status'
		  	},
		  	{
			    title: '操作',
			    key: 'operation',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.props.history.push(`/admin/house/roominfoform/${record.key}`)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.deleteRoom(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.state.data) {
	      this.state.data.forEach(v=>{
	        data.push({
	          key: v._id,
	          room_name:  v.room_name,
	          user_name: v.user_name||'-',
	          door_model: v.door_model,
	          room_floor: v.room_floor||'',
	          constructor_area: v.constructor_area||'',
	          using_area: v.using_area||'',
	          room_status: v.room_status==='待售'?<Tag color="yellow">待售</Tag>:<Tag color="green">{v.room_status}</Tag>,
	        })
	      })
	    }
	    
	    const rowSelection = {
	      onChange: (selectedRowKeys, selectedRows) => {
	        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	      }
	    };
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div className="management">
	    		<Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
	    		<Button className="management_button" onClick={()=>{this.props.history.goBack()}}>返回</Button>
	    		<SearchButton handleSearch={this.handleSearch} />
	    		<Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 800 }} />

	    		<RoomModal
					title={this.state.isAdd?'新增':'修改'}
					visible={this.state.visible}
					defaultData={this.state.defaultData}
					handleOk={this.state.defaultData?this.handleUpdateOk:this.handleAddOk}
					handleCancel={this.handleCancel}
					getFieldDecorator={getFieldDecorator}
				/>
	    	</div>
	    )
  	}
}

export default Form.create()(RoomTable)
