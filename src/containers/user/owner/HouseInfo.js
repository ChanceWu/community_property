import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon } from 'antd'
import { connect } from 'react-redux'
import { getHouseInfo } from '../../../actions/house'
import HouseInfoTable from '../../../components/table/HouseInfoTable'

const Panel = Collapse.Panel;

@connect(
	state=>state,
	{getHouseInfo}
)
class HouseInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUserId: JSON.parse(localStorage.getItem('user'))._id,
			name: JSON.parse(localStorage.getItem('user')).name,
			houseList: []
		}
	}
	componentDidMount() {
		const {currentUserId, name} = this.state
		this.props.getHouseInfo(currentUserId).then(()=>{
			this.setState({
				houseList: {name, ...this.props.house.house}
			})
		})
	}
	render() {
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<Collapse defaultActiveKey={['1']}>
				    <Panel header="房屋信息列表" key="1">
				      	<HouseInfoTable
				      		houseList={this.state.houseList}
				      	/>
				    </Panel>
			  	</Collapse>
			</div>
		)
	}
}

export default HouseInfo
