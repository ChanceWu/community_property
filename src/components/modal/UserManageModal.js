import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Radio, Select, Icon } from 'antd';
const Option = Select.Option;

class UserManageModal extends React.Component {
	render() {
		const {getFieldDecorator, isAdmin} = this.props
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
		        <Form.Item {...formItemLayout} label="用户名">
                    {getFieldDecorator('user', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="密码">
                    {getFieldDecorator('pwd', {
                    	initialValue: "1",
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="user" placeholder="请输入密码" disabled/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="确认密码">
                    {getFieldDecorator('repeatpwd', {
                    	initialValue: "1",
                        rules: [{ required: true, message: '请输入确认密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="user" placeholder="请输入确认密码" disabled/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="电话号码">
                    {getFieldDecorator('telephone', {
                        rules: [{ required: true, max: 11,pattern: /^1([3489])[0-9]{9}$/, message: '请正确输入电话号码!' }],
                    })(
                        <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="text" placeholder="请正确输入电话号码" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="身份证号码">
                    {getFieldDecorator('idnumber', {
                        rules: [{ required: true, message: '请输入身份证号码!' }],
                    })(
                        <Input prefix={<Icon type="home" style={{ fontSize: 18 }} />} type="text" placeholder="请正确输入身份证号码" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="角色">
		          	{getFieldDecorator('type', {
			          	initialValue: isAdmin?"admin":"user",
          			})(
			            <Select
						    showSearch
						    style={{ width: 236 }}
						    placeholder="选择角色"
						    disabled
					  	>
						    <Option value="user">住户</Option>
						    <Option value="admin">管理员</Option>
				  		</Select>
		          	)}
		        </Form.Item>
		        {
		        	isAdmin&&(
		        		<Form.Item {...formItemLayout} label="年龄">
		                    {getFieldDecorator('age', {
		                        rules: [{ required: true, message: '请输入年龄!' }],
		                    })(
		                        <Input placeholder="请输入年龄" />
		                    )}
		                </Form.Item>
		        	)
		        }
		        {
		        	isAdmin&&(
		        		<Form.Item {...formItemLayout} label="籍贯">
		                    {getFieldDecorator('nativeplace', {
		                        rules: [{ required: true, message: '请输入籍贯!' }],
		                    })(
		                        <Input placeholder="请输入籍贯" />
		                    )}
		                </Form.Item>
		        	)
		        }
	        </Modal>
		)
	}
}

export default UserManageModal