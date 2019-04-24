import React from 'react'
import { message } from 'antd'
import CommunityTable from '../../../components/table/CommunityTable'
import { connect } from 'react-redux'
import {
	getCommunityList,
	addCommunity,
	updateCommunity,
	deleteCommunity
} from '../../../actions/community'

@connect(
	state=>state.community,
	{
		getCommunityList,
		addCommunity,
		updateCommunity,
		deleteCommunity,
	}
)
class HouseManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		console.log(this.props)
		this.getCommunityList()
	}
	getCommunityList = () => {
		this.props.getCommunityList().then(()=>{
			this.setState({
				data: this.props.community
			})
		})
	}
	addCommunity = (values) => {
		this.props.addCommunity(values).then(()=>{
			message.success(this.props.msg)
			this.getCommunityList()
		})
	}
	updateCommunity = (values) => {
		this.props.updateCommunity(values).then(()=>{
			message.success(this.props.msg)
			this.getCommunityList()
		})
	}
	deleteCommunity = (_id) => {
		this.props.deleteCommunity({_id}).then(()=>{
			message.success(this.props.msg)
			this.getCommunityList()
		})
	}
	render() {
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<h2>HouseManage</h2>
				<CommunityTable
					community={this.state.data}
					addCommunity={this.addCommunity}
					updateCommunity={this.updateCommunity}
					deleteCommunity={this.deleteCommunity}
				/>
			</div>
			
		)
	}
}

export default HouseManage