import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon } from 'antd'
import { connect } from 'react-redux'
import { getChargeByUser, updateCharge } from '../../../actions/charge'
import ChargeInfoTable from '../../../components/table/ChargeInfoTable'

const Panel = Collapse.Panel;

@connect(
	state=>state.charge,
	{
		getChargeByUser,
		updateCharge,
	}
)
class ChargeInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user_name: JSON.parse(localStorage.getItem('user')).name,
			chargeList: '',
		}
	}
	componentDidMount() {
		this.getChargeByUser()
	}
	getChargeByUser = () => {
		this.props.getChargeByUser(this.state.user_name).then(()=>{
			this.setState({
				chargeList: this.props.charge
			})
		})
	}
	updateCharge = (value) => {
		this.props.updateCharge(value).then(()=>{
			this.getChargeByUser()
		})
	}
	render() {
		return (
			<div className="management">
				<ChargeInfoTable
					chargeList={this.state.chargeList}
					updateCharge={this.updateCharge}
				/>
			</div>
		)
	}
}

export default ChargeInfo
