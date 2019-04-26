import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio } from 'antd';

class RoomModal extends React.Component {
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
	          	<Form.Item {...formItemLayout} label="房间名称">
		          	{getFieldDecorator('room_name', {
		          		initialValue: defaultData?defaultData.room_name:'',
		            	rules: [{
		              		required: true,
		              		message: '房间名称不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入房间名称" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="户型">
		          	{getFieldDecorator('door_model', {
		          		initialValue: defaultData?defaultData.door_model:'',
		            	rules: [{
		              		required: true,
		              		message: '户型不能为空',
		            	}],
		          	})(
		            	<Input placeholder="请输入户型" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="朝向">
		          	{getFieldDecorator('room_toward', {
		          		initialValue: defaultData?defaultData.room_toward:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Input placeholder="请输入朝向" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="装修">
		          	{getFieldDecorator('room_decorate', {
		          		initialValue: defaultData?defaultData.room_decorate:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入装修" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="楼层">
		          	{getFieldDecorator('room_floor', {
		          		initialValue: defaultData?defaultData.room_floor:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入楼层" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="建筑面积">
		          	{getFieldDecorator('constructor_area', {
		          		initialValue: defaultData?defaultData.constructor_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入建筑面积" />
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
		        <Form.Item {...formItemLayout} label="车牌号">
		          	{getFieldDecorator('license_plate_num', {
		          		initialValue: defaultData?defaultData.license_plate_num:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入车牌号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车库面积">
		          	{getFieldDecorator('garage_area', {
		          		initialValue: defaultData?defaultData.garage_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入车库面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车位号">
		          	{getFieldDecorator('parking_num', {
		          		initialValue: defaultData?defaultData.parking_num:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入车位号" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="车位面积">
		          	{getFieldDecorator('parking_area', {
		          		initialValue: defaultData?defaultData.parking_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入车位面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="储藏室">
		          	{getFieldDecorator('store_room', {
		          		initialValue: defaultData?defaultData.store_room:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入储藏室" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="储藏室面积">
		          	{getFieldDecorator('storage_area', {
		          		initialValue: defaultData?defaultData.storage_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入储藏室面积" />
		          	)}
		        </Form.Item><Form.Item {...formItemLayout} label="阁楼面积">
		          	{getFieldDecorator('attic_area', {
		          		initialValue: defaultData?defaultData.attic_area:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入阁楼面积" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="房间状态">
		          	{getFieldDecorator('room_status', {
		          		initialValue: defaultData?defaultData.room_status:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入房间状态" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="物业类型">
		          	{getFieldDecorator('property_type', {
		          		initialValue: defaultData?defaultData.property_type:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入物业类型" />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="房间性质">
		          	{getFieldDecorator('room_nature', {
		          		initialValue: defaultData?defaultData.room_nature:'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<Input placeholder="请输入房间性质" />
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

export default 	RoomModal