import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import AdminMemberTable from '../../../components/table/AdminMemberTable'
import { connect } from 'react-redux'
import { getAdminList, deleteAdmin } from '../../../actions/admininfo'
import { addOwner } from '../../../actions/auth'

@connect(
	state=>({
		admininfo: state.admininfo,
		auth: state.auth,
	}), {
		getAdminList,
		deleteAdmin,
		addOwner,
	}
)
class AdminMember extends React.Component {
	componentDidMount() {
		this.props.getAdminList()
	}

	deleteAdmin = (_id) => {
		this.props.deleteAdmin(_id).then(()=>{
			message.success(this.props.admininfo.msg)
			this.props.getAdminList()
		})
	}
	addAdmin = (values) => {
		this.props.addOwner(values).then(()=>{
			message.success(this.props.auth.msg)
			this.props.getAdminList()
		})
	}
	handleSearch = (value) => {
		this.props.getAdminList(value)
	}
	render() {
		return (
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/admin/home">
					      <Icon type="home" />
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					      <span>物业人员管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/admin/infomation">
					      <span>物业人员信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<AdminMemberTable
						data={this.props.admininfo.adminlist}
						deleteAdmin={this.deleteAdmin}
						addAdmin={this.addAdmin}
						handleSearch={this.handleSearch}
					/>
				</div>
			</div>
		)
	}
}

export default AdminMember
