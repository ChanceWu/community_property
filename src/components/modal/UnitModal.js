import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio } from 'antd';

class UnitModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="单元号">
		          	{getFieldDecorator('unit_name', {
		          		initialValue: defaultData?defaultData.unit_name:'',
		            	rules: [{
		              		required: true,
		              		message: '单元号不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入单元号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="开始楼层">
		          	{getFieldDecorator('begin_floor', {
		          		initialValue: defaultData?defaultData.begin_floor:'',
		            	rules: [{
		              		required: true,
		              		message: '开始楼层不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入开始楼层" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="结束楼层">
		          	{getFieldDecorator('end_floor', {
		          		initialValue: defaultData?defaultData.end_floor:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Input placeholder="请输入结束楼层" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="开始房号">
		          	{getFieldDecorator('start_num', {
		          		initialValue: defaultData?defaultData.start_num:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入开始房号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="结束房号">
		          	{getFieldDecorator('end_num', {
		          		initialValue: defaultData?defaultData.end_num:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入结束房号" />
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

export default 	UnitModal