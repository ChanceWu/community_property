
import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import { addRepair, getRepairByUser, updateRepair, deleteRepair } from '../../../actions/repair'
import RepairInfoTable from '../../../components/table/RepairInfoTable'
import { getCommunityName } from '../../../actions/community'
import { getBuildingName } from '../../../actions/building'
import { getUnitName } from '../../../actions/unit'
import { getRoomName } from '../../../actions/room'

@connect(
	state=>({
		repair: state.repair,
		community: state.community,
		building: state.building,
		unit: state.unit,
		room: state.room,
	}), {
		getRepairByUser,
		addRepair,
		updateRepair,
		deleteRepair,

		getCommunityName,
		getBuildingName,
		getUnitName,
		getRoomName,
	}
)
class RepairInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user_id: JSON.parse(localStorage.getItem('user'))._id,
			user_name: JSON.parse(localStorage.getItem('user')).name,
			repairList: '',
		}
	}
	componentDidMount() {
		this.getRepairByUser()
		this.getCommunityName()
	}
	getRepairByUser = () => {
		this.props.getRepairByUser(this.state.user_id).then(()=>{
			this.setState({
				repairList: this.props.repair.repair
			})
		})
	}
	addRepair = (values) => {
		this.props.addRepair(values).then(()=>{
			message.success(this.props.repair.msg)
			this.getRepairByUser()
		})
	}
	updateRepair = (values) => {
		this.props.updateRepair(values).then(()=>{
			message.success(this.props.repair.msg)
			this.getRepairByUser()
		})
	}
	deleteRepair = (id) => {
		this.props.deleteRepair(id).then(()=>{
			message.success(this.props.repair.msg)
			this.getRepairByUser()
		})
	}
	getCommunityName = () => {
		this.props.getCommunityName()
	}
	getBuildingName = (community_id) => {
		this.props.getBuildingName(community_id)
	}
	getUnitName = (building_id) => {
		this.props.getUnitName(building_id)
	}
	getRoomName = (unit_id) => {
		this.props.getRoomName(unit_id)
	}
	render() {
		return (
			<div className="management">
				<RepairInfoTable
					user_id={this.state.user_id}
					user_name={this.state.user_name}
					repairList={this.state.repairList}
					addRepair={this.addRepair}
					updateRepair={this.updateRepair}
					deleteRepair={this.deleteRepair}

					communityName={this.props.community.communityName||''}
					buildingName={this.props.building.buildingName||''}
					unitName={this.props.unit.unitName||''}
					roomName={this.props.room.roomName||''}
					getBuildingName={this.getBuildingName}
					getUnitName={this.getUnitName}
					getRoomName={this.getRoomName}
				/>
			</div>
		)
	}
}

export default RepairInfo
