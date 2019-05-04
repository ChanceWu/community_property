import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import ComplaintManageTable from '../../../components/table/ComplaintManageTable'
import { getComplaintList, addComplaint, updateComplaint, deleteComplaint } from '../../../actions/complaint'
import { getOwnerName } from '../../../actions/admininfo'
import { getCommunityName } from '../../../actions/community'
import { getBuildingName } from '../../../actions/building'
import { getUnitName } from '../../../actions/unit'
import { getRoomName } from '../../../actions/room'

@connect(
	state=>({
		complaint: state.complaint,
		admininfo: state.admininfo,
		community: state.community,
		building: state.building,
		unit: state.unit,
		room: state.room,
	}), {
		getComplaintList,
		addComplaint,
		updateComplaint,
		deleteComplaint,

		getOwnerName,
		getCommunityName,
		getBuildingName,
		getUnitName,
		getRoomName,
	}
)
class ComplaintManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			complaintList: ''
		}
	}
	componentDidMount() {
		this.getComplaintList()
		this.getOwnerName()
		this.getCommunityName()
	}
	getComplaintList = () => {
		this.props.getComplaintList().then(()=>{
			this.setState({
				complaintList: this.props.complaint.complaint
			})
		})
	}
	addComplaint = (values) => {
		// const data = Object.assign({}, values, {charge_type: 'conventional'})
		this.props.addComplaint(values).then(()=>{
			message.success(this.props.complaint.msg)
			this.getComplaintList()
		})
	}
	updateComplaint = (values) => {
		this.props.updateComplaint(values).then(()=>{
			message.success(this.props.complaint.msg)
			this.getComplaintList()
		})
	}
	deleteComplaint = (id) => {
		this.props.deleteComplaint(id).then(()=>{
			message.success(this.props.complaint.msg)
			this.getComplaintList()
		})
	}
	getOwnerName = () => {
		this.props.getOwnerName()
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
				<ComplaintManageTable
					complaintList={this.state.complaintList}
					addComplaint={this.addComplaint}
					updateComplaint={this.updateComplaint}
					deleteComplaint={this.deleteComplaint}

					ownerName={this.props.admininfo.ownername||''}
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

export default ComplaintManage