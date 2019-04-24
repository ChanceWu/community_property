import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon } from 'antd'
// import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { authSuccess } from '../../../actions/auth'
import FamilyMemberTable from '../../../components/table/FamilyMemberTable'
import PersonInfoForm from '../../../components/form/PersonInfoForm'
import {
	getPersonInfo,
	updatePersonInfo,
	getFamilyMember,
	addFamilyMember,
	deleteFamilyMember,
	updateFamilyMember,
} from '../../../actions/userinfo'

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

@connect(
	state=>state,
	{
		getPersonInfo,
		updatePersonInfo,
		getFamilyMember,
		addFamilyMember,
		deleteFamilyMember,
		updateFamilyMember,
		authSuccess,
	}
)
class PersonInfo extends React.Component {
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
			},
			members: []
		}
	}
	componentDidMount() {
		const {currentUserId} = this.state
		this.props.getPersonInfo(currentUserId).then(()=>{
			this.setState({
				data: this.props.userinfo.data
			}, this.getFamilyMember())
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
		this.props.updatePersonInfo(this.state.data).then(()=>{
			message.success(this.props.userinfo.msg)
			this.props.getPersonInfo(this.state.currentUserId).then(()=>{
				console.log(this.props.userinfo)
				this.setState({
					data: this.props.userinfo.data
				}, ()=>{
					this.props.authSuccess(this.props.userinfo.data)
				})
			})
		})
	}
	getFamilyMember = () => {
		this.props.getFamilyMember(this.state.currentUserId).then(()=>{
			this.setState({
				members: this.props.userinfo.members
			})
		})
	}
	addFamilyMember = (values) => {
		values = {user_id: this.state.currentUserId, ...values};
		this.props.addFamilyMember(values).then(()=>{
			message.success(this.props.userinfo.msg)
			this.getFamilyMember()
		})
	}
	deleteFamilyMember = (_id) => {
		this.props.deleteFamilyMember(_id).then(()=>{
			message.success(this.props.userinfo.msg)
			this.getFamilyMember()
		})
	}
	updateFamilyMember = (values) => {
		this.props.updateFamilyMember(values).then(()=>{
			message.success(this.props.userinfo.msg)
			this.getFamilyMember()
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
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<Collapse defaultActiveKey={['1','2']}>
				    <Panel header="基本信息" key="1" extra={genExtra()}>
				      	<PersonInfoForm
				      		data={this.state.data}
				      		personInfoFormChange={this.personInfoFormChange}
				      		updateInfo={this.updateInfo}
				      	/>
				    </Panel>
				    <Panel header="家庭成员列表" key="2" extra={genExtra()}>
				      	<FamilyMemberTable
				      		members={this.state.members}
				      		addFamilyMember={this.addFamilyMember}
				      		deleteFamilyMember={this.deleteFamilyMember}
				      		updateFamilyMember={this.updateFamilyMember}
				      	/>
				    </Panel>
				    {/*<Panel header="This is panel header 3" key="3" extra={genExtra()}>
				      	<div>3</div>
				    </Panel>*/}
			  	</Collapse>
			</div>
			
		)
	}
}

export default PersonInfo
