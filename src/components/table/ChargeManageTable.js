import React from 'react'
import moment from 'moment'
import { Table, Button, Form, Tag, Divider } from 'antd';
import ChargeManageModal from '../modal/ChargeManageModal'
import ChargeBatchGenerationModal from '../modal/ChargeBatchGenerationModal'
import {withRouter} from 'react-router-dom'
import SearchButton from '../button/SearchButton'

@withRouter
class ChargeManageTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			visibleBatchGeneration: false,
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

  	showAddModalBatchGeneration = () => {
	    this.setState({
	      	visibleBatchGeneration: true,
	      	defaultData: '',
	    });
  	}

  	showUpdateModal = (record) => {
	    this.setState({
	      	visible: true,
	      	isAdd: false,
	      	defaultData: {...record, is_pay: record.is_pay==='已缴'?true:false},
	    });
  	}

  	handleAddOk = (e) => {
	    this.props.form.validateFields((err, values) => {
        	if (!err) {
        		// const data = Object.assign({}, values, {is_pay: false})
          		this.props.addCharge(values)
          		this.setState({
			      	visible: false,
			    });
        	}
      	});
  	}
  	handleAddOkBatchGeneration = (e) => {
	    this.props.form.validateFields((err, values) => {
        	if (!err) {
        		const data = Object.assign({}, values, {room: this.props.roomName})
          		this.props.addChargeBatchGeneration(data)
          		this.setState({
			      	visibleBatchGeneration: false,
			    });
        	}
      	});
  	}

  	handleUpdateOk = (e) => {
  		this.props.form.validateFields((err, values) => {
  			// values中并没有_id值，因此需要在参数中添加参数
  			const data = Object.assign({},values,{_id: this.state.defaultData.key})
  			if (!err) {
  				this.props.updateCharge(data)
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
	      	visibleBatchGeneration: false,
	    });
  	}
  	render() {
  		const columns = [
		  	{
		    	title: '费用名称',
		    	width: 100,
		    	dataIndex: 'charge_name',
		    	key: 'charge_name',
		    	fixed: 'left',
		  	},
		  	{
		  		title: '业主', width: 100, dataIndex: 'user_name', key: 'user_name', fixed: 'left'
		  	},
		  	{ title: '物业公司', width: 100, dataIndex: 'company', key: 'company' },
		  	{ title: '小区', width: 100, dataIndex: 'community_name', key: 'community_name' },
		  	{ title: '楼栋', width: 100, dataIndex: 'building_name', key: 'building_name' },
		  	{ title: '单元', width: 100, dataIndex: 'unit_name', key: 'unit_name' },
		  	{ title: '房间', width: 100, dataIndex: 'room_name', key: 'room_name' },
		  	{ title: '起始时间', width: 150, dataIndex: 'start_time', key: 'start_time' },
		  	{ title: '截止时间', width: 150, dataIndex: 'end_time', key: 'end_time' },
		  	{ title: '单价(元)', dataIndex: 'unit_price', key: 'unit_price' },
		  	{ title: '计费单位(元)', dataIndex: 'charge_unit', key: 'charge_unit' },
		  	{ title: '应缴费用(元)', dataIndex: 'receive_charge', key: 'receive_charge' },
		  	{
		  		title: '是否缴费', dataIndex: 'is_pay', key: 'is_pay', fixed: 'right'
		  	},
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.props.deleteCharge(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.props.chargeList) {
	      this.props.chargeList.forEach(v=>{
	        data.push({
	          key: v._id,
	          charge_name:  v.cost_id?v.cost_id.charge_name:'',
	          user_name: v.room_id?v.room_id.user_name:'',
	          company: v.cost_id?v.cost_id.company:'',
	          community_name: v.community_id?v.community_id.community_name:'',
	          building_name: v.building_id?v.building_id.building_name:'',
	          unit_name: v.unit_id?v.unit_id.unit_name:'',
	          room_name: v.room_id?v.room_id.room_name:'',
	          start_time: moment(v.start_time).format('YYYY-MM-DD')||'',
	          end_time: moment(v.end_time).format('YYYY-MM-DD')||'',
	          unit_price: v.cost_id?v.cost_id.unit_price:'',
	          charge_unit: v.charge_unit||'',
	          receive_charge:(v.cost_id&&v.charge_unit)?v.cost_id.unit_price*v.charge_unit:'',
	          is_pay: v.is_pay?'已缴':'未缴',

	          cost_id:  v.cost_id?v.cost_id._id:'',
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
	    		<Button className="management_button" type="primary" onClick={this.showAddModalBatchGeneration}>批量生成</Button>
	    		<SearchButton handleSearch={this.props.handleSearch} />
	    		<Table columns={columns} dataSource={data} scroll={{ x: 1500 }} />

	    		<ChargeManageModal
					title={this.state.isAdd?'新增':'修改'}
					visible={this.state.visible}
					defaultData={this.state.defaultData}
					handleOk={this.state.defaultData?this.handleUpdateOk:this.handleAddOk}
					handleCancel={this.handleCancel}
					getFieldDecorator={getFieldDecorator}

					costName={this.props.costName}
					communityName={this.props.communityName}
					buildingName={this.props.buildingName}
					unitName={this.props.unitName}
					roomName={this.props.roomName}
					getBuildingName={this.props.getBuildingName}
					getUnitName={this.props.getUnitName}
					getRoomName={this.props.getRoomName}
				/>

				<ChargeBatchGenerationModal
					title='批量生成'
					visible={this.state.visibleBatchGeneration}
					defaultData={this.state.defaultData}
					handleOk={this.handleAddOkBatchGeneration}
					handleCancel={this.handleCancel}
					getFieldDecorator={getFieldDecorator}

					costName={this.props.costName}
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

export default Form.create()(ChargeManageTable)
