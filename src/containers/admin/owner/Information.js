import React from 'react'
import { message } from 'antd'
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
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<InfoList data={this.props.data} deleteOwner={this.deleteOwner} />
			</div>
			
		)
	}
}

export default Information
