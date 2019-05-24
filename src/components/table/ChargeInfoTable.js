import React from 'react'
import moment from 'moment'
import { Table, Button, Form, Tag, Divider, message } from 'antd';
import {withRouter} from 'react-router-dom'
import SearchButton from '../button/SearchButton'

@withRouter
class ChargeInfoTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			isAdd: true,
			defaultData: '',
		}
	}
  	handlePay = (record) => {
  		console.log(record)
  		if (record.is_pay==="已缴") {
  			message.warning(`${record.charge_name}该费用已经完成支付了！`)
  		} else {
  			this.props.getPayUrl({
  				subject: record.charge_name,
  				body: `${record.company} ${record.community_name}-${record.building_name}-${record.unit_name}-${record.room_name}`,
  				amount: `${record.receive_charge}.00`,
  			})
	  		this.props.updateCharge({
	  			_id: record.key,
	  			cost_id: record.cost_id,
	  			community_id: record.community_id,
	  			building_id: record.building_id,
	  			unit_id: record.unit_id,
	  			room_id: record.room_id,
	  			start_time: record.start_time,
	  			end_time: record.end_time,
	  			charge_unit: record.charge_unit,
	  			is_pay: true,
	  		})
  		}
  	}
  	render() {
  		const columns = [
		  	{ title: '费用名称', width: 100, dataIndex: 'charge_name', key: 'charge_name', fixed: 'left' },
		  	{ title: '业主', width: 100, dataIndex: 'user_name', key: 'user_name', fixed: 'left' },
		  	{ title: '物业公司', width: 100, dataIndex: 'company', key: 'company' },
		  	{ title: '小区', dataIndex: 'community_name', key: 'community_name' },
		  	{ title: '楼栋', dataIndex: 'building_name', key: 'building_name' },
		  	{ title: '单元', dataIndex: 'unit_name', key: 'unit_name' },
		  	{ title: '房间', dataIndex: 'room_name', key: 'room_name' },
		  	{ title: '起始时间', dataIndex: 'start_time', key: 'start_time' },
		  	{ title: '截止时间', dataIndex: 'end_time', key: 'end_time' },
		  	{ title: '单价', dataIndex: 'unit_price', key: 'unit_price' },
		  	{ title: '计费单位', dataIndex: 'charge_unit', key: 'charge_unit' },
		  	{ title: '应缴费用', dataIndex: 'receive_charge', key: 'receive_charge' },
		  	{
		  		title: '是否缴费', dataIndex: 'is_pay', key: 'is_pay', fixed: 'right'
		  	},
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	{/*<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />*/}
				      	<Tag color="red" onClick={()=>{this.handlePay(record)}}>缴费</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.props.chargeList) {
	      this.props.chargeList.forEach(item=>{
	      	item.forEach(v=>{
	      		data.push({
		          key: v._id,
		          charge_name:  v.cost_id?v.cost_id.charge_name:'',
		          user_name: v.room_id?v.room_id.user_name:'',
		          company: v.cost_id?v.cost_id.company:'',
		          community_name: v.community_id?v.community_id.community_name:'',
		          building_name: v.building_id?v.building_id.building_name:'',
		          unit_name: v.unit_id?v.unit_id.unit_name:'',
		          room_name: v.room_id?v.room_id.room_name:'',
		          start_time: moment(v.start_time).format('YYYY-MM-DD')||'',
		          end_time: moment(v.end_time).format('YYYY-MM-DD')||'',
		          unit_price: v.cost_id?v.cost_id.unit_price:'',
		          charge_unit: v.charge_unit||'',
		          receive_charge:(v.cost_id&&v.charge_unit)?v.cost_id.unit_price*v.charge_unit:'',
		          is_pay: v.is_pay?'已缴':'未缴',

		          cost_id:  v.cost_id?v.cost_id._id:'',
		          community_id: v.community_id?v.community_id._id:'',
		          building_id: v.building_id?v.building_id._id:'',
		          unit_id: v.unit_id?v.unit_id._id:'',
		          room_id: v.room_id?v.room_id._id:'',
		        })
	      	})
	      })
	    }
	    
	    return (
	    	<div>
	    		<SearchButton handleSearch={this.props.handleSearch} />
	    		<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
	    	</div>
	    )
  	}
}

export default Form.create()(ChargeInfoTable)
