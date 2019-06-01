import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio, Select } from 'antd';
const Option = Select.Option;

class GarageManageModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="车位编号">
		          	{getFieldDecorator('garage_num', {
		          		initialValue: defaultData?defaultData.garage_num:'',
		            	rules: [{
		              		required: true,
		              		message: '车位编号不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入车位编号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="所属业主">
		          	{getFieldDecorator('user_name', {
		          		initialValue: defaultData?defaultData.user_name:'',
		            	rules: [{
		              		required: false,
		              		message: '所属业主不能为空',
		            	}],
		          	})(
		          		<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择所属业主"
					  	>
					  		<Option key='1' value=''>&nbsp;</Option>
						    {
						    	this.props.ownerName&&
						    	this.props.ownerName.map(v=><Option key={v._id} value={v.name}>{v.name}</Option>)
						    }
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="所属小区">
		          	{getFieldDecorator('community_name', {
		          		initialValue: defaultData?defaultData.community_name:'',
		            	rules: [{
		              		required: true,
		              		message: '所属小区不能为空',
		            	}],
		          	})(
		          		<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择所属小区"
					  	>
						    {
						    	this.props.communityName&&
						    	this.props.communityName.map(v=><Option key={v._id} value={v.community_name}>{v.community_name}</Option>)
						    }
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车位类别">
		          	{getFieldDecorator('garage_category', {
		          		initialValue: defaultData?defaultData.garage_category:'地下',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择车位类别"
					  	>
						    <Option value="地上">地上</Option>
						    <Option value="地下">地下</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="管理类别">
		          	{getFieldDecorator('manage_category', {
		          		initialValue: defaultData?defaultData.manage_category:'物业自用',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择管理类别"
					  	>
						    <Option value="业主自用">业主自用</Option>
						    <Option value="物业自用">物业自用</Option>
						    <Option value="物业租赁">物业租赁</Option>
						    <Option value="代理租赁">代理租赁</Option>
						    <Option value="其他车位">其他车位</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车位类型">
		          	{getFieldDecorator('garage_type', {
		          		initialValue: defaultData?defaultData.garage_type:'标准车位',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择车位类型"
					  	>
						    <Option value="标准车位">标准车位</Option>
						    <Option value="大型车位">大型车位</Option>
						    <Option value="小型车位">小型车位</Option>
						    <Option value="特殊车位">特殊车位</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="预售价格(元)">
		          	{getFieldDecorator('booking_price', {
		          		initialValue: defaultData?defaultData.booking_price:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入预售价格" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="预租价格(元)">
		          	{getFieldDecorator('rent_price', {
		          		initialValue: defaultData?defaultData.rent_price:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入预租价格" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车位位置">
		          	{getFieldDecorator('garage_location', {
		          		initialValue: defaultData?defaultData.garage_location:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入车位位置" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车位面积(m²)">
		          	{getFieldDecorator('garage_area', {
		          		initialValue: defaultData?defaultData.garage_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入车位面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="当前状态">
		          	{getFieldDecorator('garage_state', {
		          		initialValue: defaultData?defaultData.garage_state:'空闲',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择当前状态"
					  	>
						    <Option value="空闲">空闲</Option>
						    <Option value="已售">已售</Option>
						    <Option value="已租">已租</Option>
				  		</Select>
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

export default GarageManageModal