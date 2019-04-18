import React from 'react'
import InfoList from '../../../components/table/InfoList'
import { connect } from 'react-redux'
import { getOwnerInfoList } from '../../../actions/admininfo'

@connect(
	state=>state.admininfo,
	{getOwnerInfoList}
)
class Information extends React.Component {
	componentDidMount() {
		console.log(this.props)
		this.props.getOwnerInfoList()
	}
	render() {
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<h2>Inf ormation</h2>
				<InfoList data={this.props.data} />
			</div>
			
		)
	}
}

export default Information
