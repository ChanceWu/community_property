import React from 'react'
import moment from 'moment'
import { Form, Input, Button, Checkbox, Modal, Radio, Select, DatePicker } from 'antd';
const Option = Select.Option;

class RepairInfoModal extends React.Component {
	communitySelect = (value) => {
		this.props.getBuildingName(value)
	}
	buildingSelect = (value) => {
		this.props.getUnitName(value)
	}
	unitSelect = (value) => {
		this.props.getRoomName(value)
	}
	render() {
		const {defaultData, getFieldDecorator} = this.props
		const formItemLayout = {
		  	labelCol: { span: 6 },
		  	wrapperCol: { span: 12 },
		};
		return (
			<Modal
	          title={this.props.title}
	          visible={this.props.visible}
	          onOk={this.props.handleOk}
	          onCancel={this.props.handleCancel}
	          destroyOnClose
	        >
		        <Form.Item {...formItemLayout} label="小区">
		          	{getFieldDecorator('community_id', {
		          		initialValue: defaultData?defaultData.community_id:'',
		            	rules: [{
		              		required: true,
		              		message: '小区不能为空',
		            	}],
		          	})(
		          		<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择小区"
						    onSelect={this.communitySelect}
					  	>
						    {
						    	this.props.communityName&&
						    	this.props.communityName.map(v=><Option key={v._id} value={v._id}>{v.community_name}</Option>)
						    }
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="楼栋">
		          	{getFieldDecorator('building_id', {
		          		initialValue: defaultData?defaultData.building_id:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择楼栋"
						    onSelect={this.buildingSelect}
					  	>
						    {
						    	this.props.buildingName?
						    	this.props.buildingName.map(v=><Option key={v._id} value={v._id}>{v.building_name}</Option>)
						    	:<Option key={defaultData.building_id} value={defaultData.building_id}>{defaultData.building_name}</Option>
						    }
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="单元">
		          	{getFieldDecorator('unit_id', {
		          		initialValue: defaultData?defaultData.unit_id:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择单元"
						    onSelect={this.unitSelect}
					  	>
						    {
						    	this.props.unitName?
						    	this.props.unitName.map(v=><Option key={v._id} value={v._id}>{v.unit_name}</Option>)
						    	:<Option key={defaultData.unit_id} value={defaultData.unit_id}>{defaultData.unit_name}</Option>
						    }
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="房间">
		          	{getFieldDecorator('room_id', {
		          		initialValue: defaultData?defaultData.room_id:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择房间"
					  	>
						    {
						    	this.props.roomName?
						    	this.props.roomName.map(v=><Option key={v._id} value={v._id}>{v.room_name}</Option>)
						    	:<Option key={defaultData.room_id} value={defaultData.room_id}>{defaultData.room_name}</Option>
						    }
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="联系电话">
		          	{getFieldDecorator('telephone', {
		          		initialValue: defaultData?defaultData.telephone:'',
		            	rules: [{
		              		required: false,
		              		message: '联系电话不能为空',
		            	}],
		          	})(
		          		<Input placeholder="联系电话不能为空" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="申请时间">
		          	{getFieldDecorator('create_time', {
		          		initialValue: defaultData?moment(defaultData.create_time, 'YYYY-MM-DD'):moment('2015-09-13', 'YYYY-MM-DD'),
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<DatePicker style={{ width: 236 }} />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="维修内容">
		          	{getFieldDecorator('repair_content', {
		          		initialValue: defaultData?defaultData.repair_content:'',
		            	rules: [{
		              		required: false,
		              		message: '维修内容不能为空',
		            	}],
		          	})(
		          		<Input placeholder="维修内容不能为空" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="维修状态">
		          	{getFieldDecorator('repair_status', {
		          		initialValue: '待审批',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择维修状态"
						    disabled
					  	>
						    <Option value="待审批">待审批</Option>
						    <Option value="审批通过">审批通过</Option>
				  		</Select>
		          	)}
		        </Form.Item>
	        </Modal>
		)
	}
}

export default RepairInfoModal