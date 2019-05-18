import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { getGarageByUser } from '../../../actions/garage'
import GarageInfoTable from '../../../components/table/GarageInfoTable'

const Panel = Collapse.Panel;

@connect(
	state=>state.garage,
	{getGarageByUser}
)
class GarageInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: JSON.parse(localStorage.getItem('user')).name,
			garageList: '',
		}
	}
	componentDidMount() {
		const {name} = this.state
		this.props.getGarageByUser(name).then(()=>{
			this.setState({
				garageList: this.props.garage
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
				    <Breadcrumb.Item>
				      <span>信息管理</span>
				    </Breadcrumb.Item>
				    <Breadcrumb.Item href="/user/owner/garageinfo">
				      <span>车位信息</span>
				    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<Collapse defaultActiveKey={['1']}>
					    <Panel header="车库信息列表" key="1">
					      	<GarageInfoTable
					      		garageList={this.state.garageList}
					      	/>
					    </Panel>
				  	</Collapse>
				</div>
			</div>
		)
	}
}

export default GarageInfo
