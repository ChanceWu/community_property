import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
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
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/admin/home">
					      <Icon type="home" />
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					      <span>楼盘管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/house/infomation">
					      <span>楼盘信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<CommunityTable
						community={this.state.data}
						addCommunity={this.addCommunity}
						updateCommunity={this.updateCommunity}
						deleteCommunity={this.deleteCommunity}
					/>
				</div>
			</div>
		)
	}
}

export default HouseManage