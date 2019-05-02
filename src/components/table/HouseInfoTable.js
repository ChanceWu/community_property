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
		  dataIndex: 'user_name',
		  key: 'user_name',
		}, {
		  title: '户型',
		  dataIndex: 'door_model',
		  key: 'door_model',
		}, {
		  title: '使用状态',
		  dataIndex: 'room_status',
		  key: 'room_status',
		}, {
		  title: '物业类型',
		  dataIndex: 'property_type',
		  key: 'property_type',
		}, {
		  title: '装修',
		  dataIndex: 'room_decorate',
		  key: 'room_decorate',
		}, {
		  title: '房间性质',
		  dataIndex: 'room_nature',
		  key: 'room_nature',
		}, {
		  title: '朝向',
		  dataIndex: 'room_toward',
		  key: 'room_toward',
		}];

		const data = [];
		if (this.props.roomList) {
			this.props.roomList.forEach((v, i) => {
				data.push({
					key: v._id,
				  	address: v.unit_id?`${v.unit_id.building_id.community_id.community_name}/${v.unit_id.building_id.building_name}/${v.unit_id.unit_name}/${v.room_name}`:'',
				  	user_name: v.user_name||'',
				  	door_model: v.door_model || '',
				  	room_status: v.room_status==='已售'?'自住':'出租',
				  	property_type: v.property_type || '',
				  	room_decorate: v.room_decorate || '',
				  	room_nature: v.room_nature || '',
				  	room_toward: v.room_toward || '',
				})
			})
		}
		
		return (
			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		)
	}
}

export default HouseInfoTable
