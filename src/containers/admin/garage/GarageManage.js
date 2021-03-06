import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import GarageManageTable from '../../../components/table/GarageManageTable'
import { getGarageList, addGarage, updateGarage, deleteGarage } from '../../../actions/garage'
import { getCommunityName } from '../../../actions/community'
import { getOwnerName } from '../../../actions/admininfo'

@connect(
	state=>({
		garage: state.garage,
		community: state.community,
		admininfo: state.admininfo,
	}), {
		getGarageList,
		addGarage,
		updateGarage,
		deleteGarage,

		getCommunityName,
		getOwnerName,
	}
)
class GarageManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			garageList: '',
			communityName: '',
			ownerName: '',
		}
	}
	componentDidMount() {
		this.getGarageList()
		this.getCommunityName()
		this.getOwnerName()
	}
	getGarageList = () => {
		this.props.getGarageList().then(()=>{
			this.setState({
				garageList: this.props.garage.garage
			})
		})
	}
	addGarage = (values) => {
		this.props.addGarage(values).then(()=>{
			message.success(this.props.garage.msg)
			this.getGarageList()
		})
	}
	updateGarage = (values) => {
		this.props.updateGarage(values).then(()=>{
			message.success(this.props.garage.msg)
			this.getGarageList()
		})
	}
	deleteGarage = (id) => {
		this.props.deleteGarage(id).then(()=>{
			message.success(this.props.garage.msg)
			this.getGarageList()
		})
	}
	getCommunityName = () => {
		this.props.getCommunityName().then(()=>{
			this.setState({
				communityName: this.props.community.communityName
			})
		})
	}
	getOwnerName = () => {
		this.props.getOwnerName().then(()=>{
			this.setState({
				ownerName: this.props.admininfo.ownername
			})
		})
	}
	handleSearch = (value) => {
		this.props.getGarageList(value).then(()=>{
			this.setState({
				garageList: this.props.garage.garage
			})
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
					      <span>车位管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/garage/garagemanage">
					      <span>车位信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<GarageManageTable
						garageList={this.state.garageList}
						communityName={this.state.communityName}
						ownerName={this.state.ownerName}
						addGarage={this.addGarage}
						updateGarage={this.updateGarage}
						deleteGarage={this.deleteGarage}
						handleSearch={this.handleSearch}
					/>
				</div>
			</div>
		)
	}
}

export default GarageManage