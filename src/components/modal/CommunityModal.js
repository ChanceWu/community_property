import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio } from 'antd';

class CommunityModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="小区名称">
		          	{getFieldDecorator('community_name', {
		          		initialValue: defaultData?defaultData.community_name:'',
		            	rules: [{
		              		required: true,
		              		message: '名称不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入小区名称" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="所属公司">
		          	{getFieldDecorator('company', {
		          		initialValue: defaultData?defaultData.company:'',
		            	rules: [{
		              		required: true,
		              		message: '所属公司不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入所属公司" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="占地面积">
		          	{getFieldDecorator('cover_area', {
		          		initialValue: defaultData?defaultData.cover_area:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Input placeholder="请输入占地面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="绿地面积">
		          	{getFieldDecorator('green_area', {
		          		initialValue: defaultData?defaultData.green_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入绿地面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="建筑面积">
		          	{getFieldDecorator('construction_area', {
		          		initialValue: defaultData?defaultData.construction_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入建筑面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="道路面积">
		          	{getFieldDecorator('road_area', {
		          		initialValue: defaultData?defaultData.road_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入道路面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="负责人">
		          	{getFieldDecorator('admin_id', {
		          		initialValue: defaultData?defaultData.admin_id:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入负责人" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="小区地址">
		          	{getFieldDecorator('community_address', {
		          		initialValue: defaultData?defaultData.community_address:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入小区地址" />
		          	)}
		        </Form.Item>
	        </Modal>
		)
	}
}

export default CommunityModal