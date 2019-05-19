import React from 'react'
// import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import Logo from '../../components/logo/logo'
import { login } from '../../actions/auth'
// import authForm from '../../components/auth/authform'
const FormItem = Form.Item;

@connect(
	state=>state.auth,
	{ login }
)
// @authForm
class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	register = () => {
		console.log(this.props)
		this.props.history.push('/register')
	}
	handleLogin = (e) => {
		e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login(values).then(()=>{
                    if (this.props.msg==='登陆成功') {
                        message.success(this.props.msg)
                    } else {
                        message.error(this.props.msg)
                    }
                });
            }
        });
	}
	render() {
		const {redirectTo} = this.props
        console.log(this.props)
		const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
            	{redirectTo&&redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <div className="login-form" >
                    <div className="login-logo">
                        <span>登 录</span>
                        {/*this.props.msg?<p className="error_msg">{this.props.msg}</p>:null*/}
                        {/*<PwaInstaller />*/}
                    </div>
                    <Form onSubmit={this.handleLogin} style={{maxWidth: '300px'}}>
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
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span onClick={this.register} >现在就去注册!</span>
                                {/*<span ><Icon type="github" />(第三方登录)</span>*/}
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
		{/*return (
			<div>
				{redirectTo&&redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
				<Logo />
				<WingBlank>
					<List>
						{this.props.msg?<p className="error_msg">{this.props.msg}</p>:null}
						<InputItem
							onChange={v=>this.props.handleChange('user', v)}
						>
							账号
						</InputItem>
						<WhiteSpace />
						<InputItem
							type="password"
							onChange={v=>this.props.handleChange('pwd', v)}
						>
							密码
						</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type="primary">登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type="primary">注册</Button>
				</WingBlank>
			</div>
		)*/}
	}
}

export default Form.create()(Login)
