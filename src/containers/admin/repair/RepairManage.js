import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import RepairManageTable from '../../../components/table/RepairManageTable'
import { getRepairList, addRepair, updateRepair, deleteRepair } from '../../../actions/repair'
import { getOwnerName } from '../../../actions/admininfo'
import { getCommunityName } from '../../../actions/community'
import { getBuildingName } from '../../../actions/building'
import { getUnitName } from '../../../actions/unit'
import { getRoomName } from '../../../actions/room'

@connect(
	state=>({
		repair: state.repair,
		admininfo: state.admininfo,
		community: state.community,
		building: state.building,
		unit: state.unit,
		room: state.room,
	}), {
		getRepairList,
		addRepair,
		updateRepair,
		deleteRepair,

		getOwnerName,
		getCommunityName,
		getBuildingName,
		getUnitName,
		getRoomName,
	}
)
class RepairManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			repairList: ''
		}
	}
	componentDidMount() {
		this.getRepairList()
		this.getOwnerName()
		this.getCommunityName()
	}
	getRepairList = () => {
		this.props.getRepairList().then(()=>{
			this.setState({
				repairList: this.props.repair.repair
			})
		})
	}
	addRepair = (values) => {
		// const data = Object.assign({}, values, {charge_type: 'conventional'})
		this.props.addRepair(values).then(()=>{
			message.success(this.props.repair.msg)
			this.getRepairList()
		})
	}
	updateRepair = (values) => {
		this.props.updateRepair(values).then(()=>{
			message.success(this.props.repair.msg)
			this.getRepairList()
		})
	}
	deleteRepair = (id) => {
		this.props.deleteRepair(id).then(()=>{
			message.success(this.props.repair.msg)
			this.getRepairList()
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
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/admin/home">
					      <Icon type="home" />
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					      <span>维修管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/repair/repairmanage">
					      <span>维修信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<RepairManageTable
						repairList={this.state.repairList}
						addRepair={this.addRepair}
						updateRepair={this.updateRepair}
						deleteRepair={this.deleteRepair}

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

export default RepairManage