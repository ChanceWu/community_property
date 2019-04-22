import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon } from 'antd'
import HouseInfoTable from '../../../components/form/HouseInfoTable'

const Panel = Collapse.Panel;

class HouseInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUserId: JSON.parse(localStorage.getItem('user'))._id,
			members: []
		}
	}
	/*componentDidMount() {
		const {currentUserId} = this.state
		this.props.getHouseInfo(currentUserId).then(()=>{
			this.setState({
				members: this.props.userinfo.members
			})
		})
	}*/
	render() {
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<Collapse defaultActiveKey={['1']}>
				    <Panel header="房屋信息列表" key="1">
				      	<HouseInfoTable
				      		members={this.state.members}
				      	/>
				    </Panel>
			  	</Collapse>
			</div>
		)
	}
}

export default HouseInfo
