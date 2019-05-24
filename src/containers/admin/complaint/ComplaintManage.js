import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
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
	handleSearch = (value) => {
		this.props.getComplaintList(value).then(()=>{
			this.setState({
				complaintList: this.props.complaint.complaint
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
					      <span>投诉管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/repair/repairmanage">
					      <span>投诉信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<ComplaintManageTable
						complaintList={this.state.complaintList}
						addComplaint={this.addComplaint}
						updateComplaint={this.updateComplaint}
						deleteComplaint={this.deleteComplaint}
						handleSearch={this.handleSearch}

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
			</div>
		)
	}
}

export default ComplaintManage