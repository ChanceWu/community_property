import React from 'react'
import { Table } from 'antd';

class GarageInfoTable extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const columns = [{
		  title: '所属房产',
		  dataIndex: 'community_name',
		  key: 'community_name',
		}, {
		  title: '车位编号',
		  dataIndex: 'garage_num',
		  key: 'garage_num',
		}, {
		  title: '车位类别',
		  dataIndex: 'garage_category',
		  key: 'garage_category',
		}, {
		  title: '管理类别',
		  dataIndex: 'manage_category',
		  key: 'manage_category',
		}, {
		  title: '车位类型',
		  dataIndex: 'garage_type',
		  key: 'garage_type',
		}, {
		  title: '预售价格',
		  dataIndex: 'booking_price',
		  key: 'booking_price',
		}, {
		  title: '预租价格',
		  dataIndex: 'rent_price',
		  key: 'rent_price',
		}, {
		  title: '车位位置',
		  dataIndex: 'garage_location',
		  key: 'garage_location',
		}, {
		  title: '车位面积',
		  dataIndex: 'garage_area',
		  key: 'garage_area',
		}, {
		  title: '当前状态',
		  dataIndex: 'garage_state',
		  key: 'garage_state',
		}, {
		  title: '备注',
		  dataIndex: 'note',
		  key: 'note',
		}];

		const data = [];
		if (this.props.garageList) {
			this.props.garageList.forEach((v, i) => {
				data.push({
					key: v._id,
				  	community_name: v.community_name||'',
				  	garage_num: v.garage_num||'',
				  	garage_category: v.garage_category || '',
				  	manage_category: v.manage_category||'',
				  	garage_type: v.garage_type || '',
				  	booking_price: v.booking_price || '',
				  	rent_price: v.rent_price || '',
				  	garage_location: v.garage_location || '',
				  	garage_area: v.garage_area || '',
				  	garage_state: v.garage_state || '',
				  	note: v.note || '',
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

export default GarageInfoTable
