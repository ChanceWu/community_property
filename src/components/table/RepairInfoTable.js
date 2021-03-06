import React from 'react'
import moment from 'moment'
import { Table, Button, Form, Tag, Divider } from 'antd';
import RepairInfoModal from '../modal/RepairInfoModal'
import {withRouter} from 'react-router-dom'
import SearchButton from '../button/SearchButton'

@withRouter
class RepairInfoTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			isAdd: true,
			defaultData: '',
		}
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
        		const data = Object.assign({}, values, {user_id:  this.props.user_id})
          		this.props.addRepair(data)
          		this.setState({
			      	visible: false,
			    });
        	}
      	});
  	}
  	handleUpdateOk = (e) => {
  		this.props.form.validateFields((err, values) => {
  			// values中并没有_id值，因此需要在参数中添加参数
  			const data = Object.assign({},values,{_id: this.state.defaultData.key, user_id:  this.props.user_id})
  			if (!err) {
  				this.props.updateRepair(data)
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
  	render() {
  		const columns = [
  			{ title: '维修内容', width: 200, dataIndex: 'repair_content', key: 'repair_content', fixed: 'left' },
		  	{ title: '小区', dataIndex: 'community_name', key: 'community_name' },
		  	{ title: '楼栋', dataIndex: 'building_name', key: 'building_name' },
		  	{ title: '单元', dataIndex: 'unit_name', key: 'unit_name' },
		  	{ title: '房间', dataIndex: 'room_name', key: 'room_name' },
		  	{ title: '联系电话', dataIndex: 'telephone', key: 'telephone' },
		  	{ title: '申请时间', dataIndex: 'create_time', key: 'create_time' },
		  	{ title: '维修状态', width: 100, dataIndex: 'repair_status', key: 'repair_status', fixed: 'right' },
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.props.deleteRepair(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.props.repairList) {
	      this.props.repairList.forEach(v=>{
	        data.push({
	          key: v._id,
	          community_name: v.community_id?v.community_id.community_name:'',
	          building_name: v.building_id?v.building_id.building_name:'',
	          unit_name: v.unit_id?v.unit_id.unit_name:'',
	          room_name: v.room_id?v.room_id.room_name:'',
	          telephone: v.telephone||'',
	          create_time: moment(v.create_time).format('YYYY-MM-DD')||'',
	          repair_status: v.repair_status||'',
	          repair_content: v.repair_content||'',

	          community_id: v.community_id?v.community_id._id:'',
	          building_id: v.building_id?v.building_id._id:'',
	          unit_id: v.unit_id?v.unit_id._id:'',
	          room_id: v.room_id?v.room_id._id:'',
	        })
	      })
	    }
	    
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div>
	    		<Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
	    		<SearchButton handleSearch={this.props.handleSearch} />
	    		<Table columns={columns} dataSource={data} scroll={{ x: 1100 }} />

	    		<RepairInfoModal
					title={this.state.isAdd?'新增':'修改'}
					visible={this.state.visible}
					defaultData={this.state.defaultData}
					handleOk={this.state.defaultData?this.handleUpdateOk:this.handleAddOk}
					handleCancel={this.handleCancel}
					getFieldDecorator={getFieldDecorator}

					communityName={this.props.communityName}
					buildingName={this.props.buildingName}
					unitName={this.props.unitName}
					roomName={this.props.roomName}
					getBuildingName={this.props.getBuildingName}
					getUnitName={this.props.getUnitName}
					getRoomName={this.props.getRoomName}
				/>
	    	</div>
	    )
  	}
}

export default Form.create()(RepairInfoTable)
