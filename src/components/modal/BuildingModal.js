import React from 'react'
import moment from 'moment'
import { Form, Input, Button, Checkbox, Modal, Radio, Select, DatePicker } from 'antd';
const Option = Select.Option;

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
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    // defaultValue={{key: ''}}
						    placeholder="请选择楼宇功能"
						    optionFilterProp="children"
						    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					  	>
						    <Option value="居住">居住</Option>
						    <Option value="商铺">商铺</Option>
						    <Option value="店面">店面</Option>
						    <Option value="库房">库房</Option>
						    <Option value="商住综合">商住综合</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="结构类别">
		          	{getFieldDecorator('structure_category', {
		          		initialValue: defaultData?defaultData.structure_category:'',
		            	rules: [{
		              		required: false,
		            	}],
		          	})(
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    // defaultValue={{key: ''}}
						    placeholder="请选择结构类别"
						    optionFilterProp="children"
						    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					  	>
						    <Option value="水泥结构">水泥结构</Option>
						    <Option value="钢筋结构">钢筋结构</Option>
						    <Option value="木结构">木结构</Option>
						    <Option value="砖结构">砖结构</Option>
				  		</Select>
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
		            	<Select
						    showSearch
						    style={{ width: 236 }}
						    // defaultValue={{key: ''}}
						    placeholder="请选择装修标准"
						    optionFilterProp="children"
						    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					  	>
						    <Option value="简装">简装</Option>
						    <Option value="精装">精装</Option>
						    <Option value="豪华">豪华</Option>
				  		</Select>
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
		          		initialValue: defaultData?moment(defaultData.completion_date, 'YYYY-MM-DD'):'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
			          	<DatePicker style={{ width: 236 }} />
		          	)}
		        </Form.Item>
		        <Form.Item {...formItemLayout} label="封顶日期">
		          	{getFieldDecorator('cap_date', {
		          		initialValue: defaultData?moment(defaultData.cap_date, 'YYYY-MM-DD'):'',
		            	rules: [{
		              		required: false,
		              		message: 'Please input your nickname',
		            	}],
		          	})(
		            	<DatePicker style={{ width: 236 }} />
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