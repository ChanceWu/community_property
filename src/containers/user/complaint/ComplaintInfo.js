import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { addComplaint, getComplaintByUser, updateComplaint, deleteComplaint } from '../../../actions/complaint'
import ComplaintInfoTable from '../../../components/table/ComplaintInfoTable'
import { getCommunityName } from '../../../actions/community'
import { getBuildingName } from '../../../actions/building'
import { getUnitName } from '../../../actions/unit'
import { getRoomName } from '../../../actions/room'

@connect(
	state=>({
		complaint: state.complaint,
		community: state.community,
		building: state.building,
		unit: state.unit,
		room: state.room,
	}), {
		getComplaintByUser,
		addComplaint,
		updateComplaint,
		deleteComplaint,

		getCommunityName,
		getBuildingName,
		getUnitName,
		getRoomName,
	}
)
class ComplaintInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user_id: JSON.parse(localStorage.getItem('user'))._id,
			user_name: JSON.parse(localStorage.getItem('user')).name,
			complaintList: '',
		}
	}
	componentDidMount() {
		this.getComplaintByUser()
		this.getCommunityName()
	}
	getComplaintByUser = () => {
		this.props.getComplaintByUser(this.state.user_id).then(()=>{
			this.setState({
				complaintList: this.props.complaint.complaint
			})
		})
	}
	addComplaint = (values) => {
		this.props.addComplaint(values).then(()=>{
			message.success(this.props.complaint.msg)
			this.getComplaintByUser()
		})
	}
	updateComplaint = (values) => {
		this.props.updateComplaint(values).then(()=>{
			message.success(this.props.complaint.msg)
			this.getComplaintByUser()
		})
	}
	deleteComplaint = (id) => {
		this.props.deleteComplaint(id).then(()=>{
			message.success(this.props.complaint.msg)
			this.getComplaintByUser()
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
	handleSearch = (value) => {
		this.props.getComplaintByUser(this.state.user_id, value).then(()=>{
			this.setState({
				complaintList: this.props.complaint.complaint
			})
		})
	}
	render() {
		return (
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/user/home">
				      <Icon type="home" />
				    </Breadcrumb.Item>
				    <Breadcrumb.Item href="">
				      <span>投诉反馈</span>
				    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<ComplaintInfoTable
						user_id={this.state.user_id}
						user_name={this.state.user_name}
						complaintList={this.state.complaintList}
						addComplaint={this.addComplaint}
						updateComplaint={this.updateComplaint}
						deleteComplaint={this.deleteComplaint}
						handleSearch={this.handleSearch}

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

export default ComplaintInfo
