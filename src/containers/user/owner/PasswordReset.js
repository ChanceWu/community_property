import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon, Breadcrumb } from 'antd'
// import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { authSuccess } from '../../../actions/auth'
import PasswordResetForm from '../../../components/form/PasswordResetForm'
import {
	getPersonInfo,
	updatePassword,
} from '../../../actions/userinfo'

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

@connect(
	state=>state,
	{
		getPersonInfo,
		updatePassword,
		authSuccess,
	}
)
class PasswordReset extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUserId: JSON.parse(localStorage.getItem('user'))._id,
			data: {
				name: '',
				type:'',
				telephone: '',
				idnumber: '',
				gender: true,
				age: '',
				nativeplace: '',
				pwd: '',
				oldpwd:'',
			},
		}
	}
	componentDidMount() {
		const {currentUserId} = this.state
		this.props.getPersonInfo(currentUserId).then(()=>{
			this.setState({
				data: this.props.userinfo.data
			})
		})
	}
	personInfoFormChange = (key, val) => {
		const { data } = this.state
		data[key] = val
		this.setState({
			data: {...data}
		})
	}
	updateInfo = () => {
		console.log(this.state.data)
		// this.props.dispatch(updatePersonInfo(this.state.data))
		this.props.updatePassword(this.state.data).then(()=>{
			if (this.props.userinfo.msg==='旧密码错误！') {
				message.error(this.props.userinfo.msg)
			} else {
				message.success(this.props.userinfo.msg)
				this.props.getPersonInfo(this.state.currentUserId).then(()=>{
					console.log(this.props.userinfo)
					this.setState({
						data: this.props.userinfo.data
					}, ()=>{
						this.props.authSuccess(this.props.userinfo.data)
					})
				})
			}
			
		})
	}
	render() {
		const genExtra = () => (
		  <Icon
		    type="setting"
		    onClick={(event) => {
		      // If you don't want click extra trigger collapse, you can prevent this:
		      event.stopPropagation();
		    }}
		  />
		);
		/*const { userinfo } = this.props*/
		return (
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/user/home">
				      <Icon type="home" />
				    </Breadcrumb.Item>
				    <Breadcrumb.Item>
				      <span>信息管理</span>
				    </Breadcrumb.Item>
				    <Breadcrumb.Item href="/user/owner/passwordreset">
				      <span>密码重置</span>
				    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<Collapse defaultActiveKey={['1']}>
					    <Panel header="密码重置" key="1" extra={genExtra()}>
					      	<PasswordResetForm
					      		data={this.state.data}
					      		personInfoFormChange={this.personInfoFormChange}
					      		updateInfo={this.updateInfo}
					      	/>
					    </Panel>
				  	</Collapse>
				</div>
			</div>
		)
	}
}

export default PasswordReset
