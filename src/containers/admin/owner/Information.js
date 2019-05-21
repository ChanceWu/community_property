import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { getOwnerInfoList, deleteOwner } from '../../../actions/admininfo'

@connect(
	state=>state.admininfo,
	{getOwnerInfoList, deleteOwner}
)
class Information extends React.Component {
	componentDidMount() {
		this.props.getOwnerInfoList()
	}

	deleteOwner = (_id) => {
		this.props.deleteOwner(_id).then(()=>{
			message.success(this.props.msg)
			this.props.getOwnerInfoList()
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
					      <span>业主管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/owner/infomation">
					      <span>业主信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<InfoList data={this.props.data} deleteOwner={this.deleteOwner} />
				</div>
			</div>
		)
	}
}

export default Information
