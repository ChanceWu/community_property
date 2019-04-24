import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio } from 'antd';

class BuildingModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="楼号">
		          	{getFieldDecorator('building_name', {
		          		initialValue: defaultData?defaultData.building_name:'',
		            	rules: [{
		              		required: true,
		              		message: '楼号不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入楼号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="楼宇功能">
		          	{getFieldDecorator('building_function', {
		          		initialValue: defaultData?defaultData.building_function:'',
		            	rules: [{
		              		required: true,
		              		message: '楼宇功能不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入楼宇功能" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="结构类别">
		          	{getFieldDecorator('structure_category', {
		          		initialValue: defaultData?defaultData.structure_category:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Input placeholder="请输入结构类别" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="装修标准">
		          	{getFieldDecorator('decorate_standard', {
		          		initialValue: defaultData?defaultData.decorate_standard:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入装修标准" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="使用面积">
		          	{getFieldDecorator('using_area', {
		          		initialValue: defaultData?defaultData.using_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入使用面积" />
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
		        <Form.Item {...formItemLayout} label="建筑许可证">
		          	{getFieldDecorator('building_permit', {
		          		initialValue: defaultData?defaultData.building_permit:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入建筑许可证" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="预售许可证">
		          	{getFieldDecorator('presale_permit', {
		          		initialValue: defaultData?defaultData.presale_permit:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入预售许可证" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="竣工日期">
		          	{getFieldDecorator('completion_date', {
		          		initialValue: defaultData?defaultData.completion_date:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入竣工日期" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="封顶日期">
		          	{getFieldDecorator('cap_date', {
		          		initialValue: defaultData?defaultData.cap_date:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入封顶日期" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="备注">
		          	{getFieldDecorator('note', {
		          		initialValue: defaultData?defaultData.note:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入备注" />
		          	)}
		        </Form.Item>
	        </Modal>
		)
	}
}

export default BuildingModal