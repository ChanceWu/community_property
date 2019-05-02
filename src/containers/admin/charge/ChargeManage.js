
import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import ChargeManageTable from '../../../components/table/ChargeManageTable'
import { getChargeList, addCharge, updateCharge, deleteCharge } from '../../../actions/charge'
import { getCostName } from '../../../actions/cost'
import { getCommunityName } from '../../../actions/community'
import { getBuildingName } from '../../../actions/building'
import { getUnitName } from '../../../actions/unit'
import { getRoomName } from '../../../actions/room'

@connect(
	state=>({
		charge: state.charge,
		cost: state.cost,
		community: state.community,
		building: state.building,
		unit: state.unit,
		room: state.room,
	}), {
		getChargeList,
		addCharge,
		updateCharge,
		deleteCharge,

		getCostName,
		getCommunityName,
		getBuildingName,
		getUnitName,
		getRoomName,
	}
)
class ChargeManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			chargeList: ''
		}
	}
	componentDidMount() {
		this.getChargeList()
		this.getCostName()
		this.getCommunityName()
	}
	getChargeList = () => {
		this.props.getChargeList().then(()=>{
			this.setState({
				chargeList: this.props.charge.charge
			})
		})
	}
	addCharge = (values) => {
		// const data = Object.assign({}, values, {charge_type: 'conventional'})
		this.props.addCharge(values).then(()=>{
			message.success(this.props.charge.msg)
			this.getChargeList()
		})
	}
	updateCharge = (values) => {
		this.props.updateCharge(values).then(()=>{
			message.success(this.props.charge.msg)
			this.getChargeList()
		})
	}
	deleteCharge = (id) => {
		this.props.deleteCharge(id).then(()=>{
			message.success(this.props.charge.msg)
			this.getChargeList()
		})
	}
	getCostName = () => {
		this.props.getCostName()
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
				<ChargeManageTable
					chargeList={this.state.chargeList}
					addCharge={this.addCharge}
					updateCharge={this.updateCharge}
					deleteCharge={this.deleteCharge}

					costName={this.props.cost.costName||''}
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

export default ChargeManage