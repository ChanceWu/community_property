import React from 'react'
import { Table } from 'antd';

class HouseInfoTable extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const columns = [{
		  title: '房产',
		  dataIndex: 'address',
		  key: 'address',
		}, {
		  title: '户主',
		  dataIndex: 'owner',
		  key: 'owner',
		}, {
		  title: '使用状态',
		  dataIndex: 'status',
		  key: 'age',
		}, {
		  title: '入住时间',
		  dataIndex: 'Check_in_time',
		  key: 'Check_in_time',
		}, {
		  title: '认购证号',
		  dataIndex: 'Subscription_card_number',
		  key: 'Subscription_card_number',
		}, {
		  title: '房产证号',
		  dataIndex: 'House_property_card_number',
		  key: 'House_property_card_number',
		}];

		const data = [{
			key: '1',
			address: '东六322',
			owner: '男',
			status: '自住',
			Check_in_time: '2018-01-11',
			Subscription_card_number: '222222',
			House_property_card_number: '1111111'
		}, {
			key: '2',
			address: '东六312',
			owner: '男',
			status: '自住',
			Check_in_time: '2018-01-21',
			Subscription_card_number: '5555555',
			House_property_card_number: '1111111'
		}];
		/*this.props.members.forEach((v, i) => {
			data.push({
				key: v._id,
			  	name: v.name,
			  	gender: v.gender?'男':'女',
			  	age: v.age || '',
			  	relationship: v.relationship || '',
			  	telephone: v.telephone || '',
			})
		})*/
		return (
			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		)
	}
}

export default HouseInfoTable
