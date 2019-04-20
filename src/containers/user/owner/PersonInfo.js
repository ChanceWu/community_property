import React from 'react'
import { message } from 'antd'
// import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { getPersonInfo, updatePersonInfo } from '../../../actions/userinfo'
import { authSuccess } from '../../../actions/auth'
import PersonInfoManage from '../../../components/form/PersonInfoManage'

const initData = {
	name: '',
	type:'',
	telephone: '',
	idnumber: '',
	gender: true,
	age: '',
	nativeplace: '',
}

@connect(
	state=>state,
	{getPersonInfo, updatePersonInfo, authSuccess}
)
class PersonInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: initData
		}
	}
	componentDidMount() {
		this.props.getPersonInfo(this.props.auth._id).then(()=>{
			this.setState({
				data: this.props.userinfo.data
			})
		})
	}
	/*componentWillReceiveProps(nextProps) {
		console.log(this.props, this.state.data, this.props.userinfo)
		let hasProp = false;  
	    for (let prop in this.props.userinfo) {
	        hasProp = true;
	        break;
	    }
	    if (hasProp){
	        this.setState({
				data: this.props.userinfo.data
			})
	    }
	}*/
	/*shouldComponentUpdate(nextProps,nextState){
      	if(nextProps.userinfo.data === nextState.data){
	        this.setState({
				data: this.props.userinfo.data
			})
			return true
      	}
  	}*/
	handleChange = (key, val) => {
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
			this.props.getPersonInfo(this.props.auth._id).then(()=>{
				console.log(this.props.userinfo)
				this.setState({
					data: this.props.userinfo.data
				}, ()=>{
					this.props.authSuccess(this.props.userinfo.data)
				})
			})
		})
		
	}
	render() {
		/*const { userinfo } = this.props*/
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				{/*<h2>Inf ormation {data&&data.name}</h2>*/}
				{/*<InfoList data={this.props.data} />*/}
				<PersonInfoManage data={this.state.data} handleChange={this.handleChange} updateInfo={this.updateInfo}/>
			</div>
			
		)
	}
}

export default PersonInfo
