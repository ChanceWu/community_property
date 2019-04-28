import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio, Select } from 'antd';
const Option = Select.Option;

class ConventionalCostModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="费用编号">
		          	{getFieldDecorator('charge_num', {
		          		initialValue: defaultData?defaultData.charge_num:'',
		            	rules: [{
		              		required: true,
		              		message: '费用编号不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入费用编号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="费用名称">
		          	{getFieldDecorator('charge_name', {
		          		initialValue: defaultData?defaultData.charge_name:'',
		            	rules: [{
		              		required: true,
		              		message: '费用名称不能为空',
		            	}],
		          	})(
		          		<Input placeholder="请输入费用名称" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="物业公司">
		          	{getFieldDecorator('company', {
		          		initialValue: defaultData?defaultData.company:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    // defaultValue={{key: ''}}
						    placeholder="选择物业公司"
						    optionFilterProp="children"
						    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					  	>
						    <Option value="兴福物业">兴福物业</Option>
						    <Option value="东风物业">东风物业</Option>
						    <Option value="平安物业">平安物业</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="收费方式">
		          	{getFieldDecorator('charge_way', {
		          		initialValue: defaultData?defaultData.charge_way:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入收费方式" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="单位价格">
		          	{getFieldDecorator('unit_price', {
		          		initialValue: defaultData?defaultData.unit_price:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入单位价格" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="收费周期(月)">
		          	{getFieldDecorator('charge_cycle', {
		          		initialValue: defaultData?defaultData.charge_cycle:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入收费周期" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="滞纳金比率‰">
		          	{getFieldDecorator('charge_late', {
		          		initialValue: defaultData?defaultData.charge_late:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入滞纳金比率‰" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="超过天数">
		          	{getFieldDecorator('over_day', {
		          		initialValue: defaultData?defaultData.over_day:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入超过天数" />
		          	)}
		        </Form.Item>
	        </Modal>
		)
	}
}

export default ConventionalCostModal