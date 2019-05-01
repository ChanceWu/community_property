import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio, Select } from 'antd';
const Option = Select.Option;

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
		              		required: false,
		              		message: '户型不能为空',
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="请选择户型"
					  	>
						    <Option value="二室一厅">二室一厅</Option>
						    <Option value="三室一厅">三室一厅</Option>
						    <Option value="二室二厅">二室二厅</Option>
						    <Option value="三室二厅">三室二厅</Option>
						    <Option value="一室一厅">一室一厅</Option>
						    <Option value="一室一卫">一室一卫</Option>
						    <Option value="独立开间">独立开间</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="朝向">
		          	{getFieldDecorator('room_toward', {
		          		initialValue: defaultData?defaultData.room_toward:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="请选择朝向"
					  	>
						    <Option value="坐西朝东">坐西朝东</Option>
						    <Option value="坐东朝西">坐东朝西</Option>
						    <Option value="坐南朝北">坐南朝北</Option>
						    <Option value="坐北朝南">坐北朝南</Option>
				  		</Select>
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
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="请选择装修类型"
					  	>
						    <Option value="简装">简装</Option>
						    <Option value="精装">精装</Option>
						    <Option value="豪华">豪华</Option>
				  		</Select>
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
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="请选择房间状态"
					  	>
					  		<Option value="待售">待售</Option>
						    <Option value="已售">已售</Option>
						    <Option value="已租">已租</Option>
				  		</Select>
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
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="请选择物业类型"
					  	>
						    <Option value="A类-标准">A类-标准</Option>
						    <Option value="B类-贵宾">B类-贵宾</Option>
						    <Option value="C类-免缴费">C类-免缴费</Option>
						    <Option value="D类-自用">D类-自用</Option>
						    <Option value="E类-其他">E类-其他</Option>
				  		</Select>
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
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="请选择房间性质"
					  	>
						    <Option value="公产">公产</Option>
						    <Option value="私产">私产</Option>
						    <Option value="半公产半私产">半公产半私产</Option>
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

export default 	RoomModal