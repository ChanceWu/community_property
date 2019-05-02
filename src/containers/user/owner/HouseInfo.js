import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon } from 'antd'
import { connect } from 'react-redux'
import { getRoomByUser } from '../../../actions/room'
import HouseInfoTable from '../../../components/table/HouseInfoTable'

const Panel = Collapse.Panel;

@connect(
	state=>state.room,
	{getRoomByUser}
)
class HouseInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: JSON.parse(localStorage.getItem('user')).name,
			roomList: '',
		}
	}
	componentDidMount() {
		const {name} = this.state
		this.props.getRoomByUser(name).then(()=>{
			this.setState({
				roomList: this.props.room
			})
		})
	}
	render() {
		return (
			<div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
				<Collapse defaultActiveKey={['1']}>
				    <Panel header="房屋信息列表" key="1">
				      	<HouseInfoTable
				      		roomList={this.state.roomList}
				      	/>
				    </Panel>
			  	</Collapse>
			</div>
		)
	}
}

export default HouseInfo
