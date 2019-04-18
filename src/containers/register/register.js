import React from 'react'
// import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd'
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import Logo from '../../component/logo/logo'
import { register } from '../../actions/auth'
// import authForm from '../../components/auth/authform'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(
	state=>state.user,
	{register}
)
// @authForm
class Register extends React.Component {
	constructor(props) {
		super(props)
	}
	handleRegister = (e) => {
		e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.register(values);
            }
        });
	}
	render() {
		const {redirectTo} = this.props

		const { getFieldDecorator } = this.props.form;
        return (
            <div className="register">
            	{redirectTo&&redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <div className="register-form" >
                    <div className="register-logo">
                        <span>注册信息</span>
                        {this.props.msg?<p className="error_msg">{this.props.msg}</p>:null}
                    </div>
                    <Form onSubmit={this.handleRegister} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('user', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pwd', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('repeatpwd', {
                                rules: [{ required: true, message: '请输入确认密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入确认密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('telephone', {
                                rules: [{ required: true, max: 11,pattern: /^1([3489])[0-9]{9}$/, message: '请正确输入电话号码!' }],
                            })(
                                <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="text" placeholder="请正确输入电话号码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: '请输入地址!' }],
                            })(
                                <Input prefix={<Icon type="home" style={{ fontSize: 13 }} />} type="text" placeholder="需要输入详细地址" />
                            )}
                        </FormItem>
                        <FormItem>
				          {getFieldDecorator('type', {
				          	initialValue: "user",
				          })(
				            <RadioGroup>
				              <Radio value="user">住户</Radio>
				              <Radio value="admin">管理员</Radio>
				            </RadioGroup>
				          )}
				        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                })(
                                    <Checkbox>同意协议</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>查看协议</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
		/*return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
				{/*<Logo />*\/}
				<WingBlank>
					<List>
						{this.props.msg?<p className="error_msg">{this.props.msg}</p>:null}
						<InputItem
							onChange={v=>this.props.handleChange('user', v)}
						>
							账号
						</InputItem>
						<InputItem
							type="password"
							onChange={v=>this.props.handleChange('pwd', v)}
						>
							密码
						</InputItem>
						<InputItem
							type="password"
							onChange={v=>this.props.handleChange('repeatpwd', v)}
						>
							确认密码
						</InputItem>
					</List>
					<WhiteSpace />
					<RadioItem
						checked={this.props.state.type == 'user'}
						onChange={()=>this.props.handleChange('type', 'user')}
					>
						住户
					</RadioItem>
					<WhiteSpace />
					<RadioItem
						checked={this.props.state.type == 'admin'}
						onChange={()=>this.props.handleChange('type', 'admin')}
					>
						管理员
					</RadioItem>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>
		)*/
	}
}


export default Form.create()(Register)