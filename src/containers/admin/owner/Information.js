import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { getOwnerInfoList, deleteOwner } from '../../../actions/admininfo'
import { addOwner } from '../../../actions/auth'

@connect(
	state=>({
		admininfo: state.admininfo,
		auth: state.auth,
	}), {
		getOwnerInfoList,
		deleteOwner,
		addOwner,
	}
)
class Information extends React.Component {
	componentDidMount() {
		this.props.getOwnerInfoList()
	}

	deleteOwner = (_id) => {
		this.props.deleteOwner(_id).then(()=>{
			message.success(this.props.admininfo.msg)
			this.props.getOwnerInfoList()
		})
	}
	addOwner = (values) => {
		this.props.addOwner(values).then(()=>{
			message.success(this.props.auth.msg)
			this.props.getOwnerInfoList()
		})
	}
	handleSearch = (value) => {
		this.props.getOwnerInfoList(value)
	}
	render() {
		return (
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/admin/home">
					      <Icon type="home" />
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					      <span>业主管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/owner/infomation">
					      <span>业主信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<InfoList
						data={this.props.admininfo.data}
						deleteOwner={this.deleteOwner}
						addOwner={this.addOwner}
						handleSearch={this.handleSearch}
					/>
				</div>
			</div>
		)
	}
}

export default Information
