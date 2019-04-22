import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio } from 'antd';

class FamilyMemberModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="姓名">
		          	{getFieldDecorator('name', {
		          		initialValue: defaultData?defaultData.name:'',
		            	rules: [{
		              		required: true,
		              		message: '姓名不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入姓名" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="性别">
		          	{getFieldDecorator('gender', {
		          		initialValue: defaultData&&defaultData.gender==='女'?false:true,
		          	})(
			            <Radio.Group>
			              	<Radio value={true}>男</Radio>
			              	<Radio value={false}>女</Radio>
			            </Radio.Group>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="年龄">
		          	{getFieldDecorator('age', {
		          		initialValue: defaultData?defaultData.age:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Input placeholder="请输入年龄" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="与户主关系">
		          	{getFieldDecorator('relationship', {
		          		initialValue: defaultData?defaultData.relationship:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入与户主的关系" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="联系电话">
		          	{getFieldDecorator('telephone', {
		          		initialValue: defaultData?defaultData.telephone:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入联系电话" />
		          	)}
		        </Form.Item>
	        </Modal>
		)
	}
}

export default FamilyMemberModal