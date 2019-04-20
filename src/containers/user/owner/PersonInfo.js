import React from 'react'
// import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { getPersonInfo, updatePersonInfo } from '../../../actions/userinfo'
import PersonInfoForm from '../../../components/form/PersonInfoForm'

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
	{getPersonInfo, updatePersonInfo}
)
class PersonInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: initData
		}
		console.log(this.props, this.props.userinfo.data, this.state.data)
	}
	componentDidMount() {
		console.log(this.props, this.props.userinfo.data, this.state.data)
		this.props.getPersonInfo(this.props.auth._id)
	}
	componentWillReceiveProps(nextProps) {
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
	}
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
	saveInfo = () => {
		console.log(this.state.data)
		// this.props.dispatch(updatePersonInfo(this.state.data))
		this.props.updatePersonInfo(this.state.data)
		this.props.getPersonInfo(this.props.auth._id)
	}
	render() {
		/*const { userinfo } = this.props*/
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				{/*<h2>Inf ormation {data&&data.name}</h2>*/}
				{/*<InfoList data={this.props.data} />*/}
				<PersonInfoForm data={this.state.data} handleChange={this.handleChange} saveInfo={this.saveInfo}/>
			</div>
			
		)
	}
}

export default PersonInfo
