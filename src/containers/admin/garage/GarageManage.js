import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import GarageManageTable from '../../../components/table/GarageManageTable'
import { getGarageList, addGarage, updateGarage, deleteGarage } from '../../../actions/garage'
import { getCommunityName } from '../../../actions/community'

@connect(
	state=>({
		garage: state.garage,
		community: state.community,
	}), {
		getGarageList,
		addGarage,
		updateGarage,
		deleteGarage,

		getCommunityName,
	}
)
class GarageManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			garageList: '',
			communityName: '',
		}
	}
	componentDidMount() {
		this.getGarageList()
		this.getCommunityName()
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
	render() {
		return (
			<div className="management">
				<GarageManageTable
					garageList={this.state.garageList}
					communityName={this.state.communityName}
					addGarage={this.addGarage}
					updateGarage={this.updateGarage}
					deleteGarage={this.deleteGarage}
				/>
			</div>
		)
	}
}

export default GarageManage