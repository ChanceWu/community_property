import React from 'react'
import { message, Collapse, Input, Button, Radio, Icon, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getChargeByUser, updateCharge } from '../../../actions/charge'
import { getPayUrl } from '../../../actions/pay'
import ChargeInfoTable from '../../../components/table/ChargeInfoTable'

const Panel = Collapse.Panel;

@connect(
	state=>({
		charge: state.charge,
		pay: state.pay,
	}), {
		getChargeByUser,
		updateCharge,
		getPayUrl,
	}
)
@withRouter
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
				chargeList: this.props.charge.charge
			})
		})
	}
	updateCharge = (value) => {
		this.props.updateCharge(value).then(()=>{
			this.getChargeByUser()
		})
	}
	getPayUrl = (query) => {
		this.props.getPayUrl(query).then(()=>{
			window.open(this.props.pay.pay)
			// this.props.history.push(this.props.pay.pay)
		})
	}
	handleSearch = (value) => {
		this.props.getChargeByUser(this.state.user_name, value).then(()=>{
			this.setState({
				chargeList: this.props.charge.charge
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
				    <Breadcrumb.Item href="">
				      <span>费用</span>
				    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<ChargeInfoTable
						chargeList={this.state.chargeList}
						updateCharge={this.updateCharge}
						getPayUrl={this.getPayUrl}
						handleSearch={this.handleSearch}
					/>
				</div>
			</div>
		)
	}
}

export default ChargeInfo
