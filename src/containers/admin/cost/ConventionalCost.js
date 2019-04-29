import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import ConventionalCostTable from '../../../components/table/ConventionalCostTable'
import { getCostList, addCost, updateCost, deleteCost } from '../../../actions/cost'

@connect(
	state=>state.cost,
	{
		getCostList,
		addCost,
		updateCost,
		deleteCost,
	}
)
class ConventionalCost extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			costList: ''
		}
	}
	componentDidMount() {
		this.getCostList()
	}
	getCostList = () => {
		this.props.getCostList('conventional').then(()=>{
			this.setState({
				costList: this.props.cost
			})
		})
	}
	addCost = (values) => {
		const data = Object.assign({}, values, {charge_type: 'conventional'})
		this.props.addCost(data).then(()=>{
			message.success(this.props.msg)
			this.getCostList()
		})
	}
	updateCost = (values) => {
		this.props.updateCost(values).then(()=>{
			message.success(this.props.msg)
			this.getCostList()
		})
	}
	deleteCost = (id) => {
		this.props.deleteCost(id).then(()=>{
			message.success(this.props.msg)
			this.getCostList()
		})
	}
	render() {
		return (
			<div className="management">
				<ConventionalCostTable
					costList={this.state.costList}
					addCost={this.addCost}
					updateCost={this.updateCost}
					deleteCost={this.deleteCost}
				/>
			</div>
		)
	}
}

export default ConventionalCost