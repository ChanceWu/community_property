import React from 'react'
import { Table, Button, Form, Tag, Divider } from 'antd';
import ConventionalCostModal from '../modal/ConventionalCostModal'
import {withRouter} from 'react-router-dom'

@withRouter
class ConventionalCostTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			isAdd: true,
			defaultData: '',
		}
	}

	showAddModal = () => {
	    this.setState({
	      	visible: true,
	      	isAdd: true,
	      	defaultData: '',
	    });
  	}

  	showUpdateModal = (record) => {
	    this.setState({
	      	visible: true,
	      	isAdd: false,
	      	defaultData: {...record},
	    });
  	}

  	handleAddOk = (e) => {
	    this.props.form.validateFields((err, values) => {
        	if (!err) {
          		console.info('success', values);
          		this.props.addCost(values)
          		this.setState({
			      	visible: false,
			    });
        	}
      	});
  	}
  	handleUpdateOk = (e) => {
  		this.props.form.validateFields((err, values) => {
  			// values中并没有_id值，因此需要在参数中添加参数
  			const data = Object.assign({},values,{_id: this.state.defaultData.key})
  			if (!err) {
  				this.props.updateCost(data)
  				this.setState({
  					visible: false,
  				})
  			}
  		})
  	}

  	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      	visible: false,
	    });
  	}
  	render() {
  		const columns = [
		  	{
		    	title: '费用编号',
		    	width: 100,
		    	dataIndex: 'charge_num',
		    	key: 'charge_num',
		    	fixed: 'left',
		    	render: (text, record) => (
		    		<a onClick={()=>{this.props.history.push(`/admin/house/building/${record.key}`)}}>{text}</a>
		    	)
		  	},
		  	{ title: '费用名称', width: 100, dataIndex: 'charge_name', key: 'charge_name' },
		  	{ title: '物业公司', dataIndex: 'company', key: 'company' },
		  	{ title: '收费方式', dataIndex: 'charge_way', key: 'charge_way' },
		  	{ title: '单位价格', dataIndex: 'unit_price', key: 'unit_price' },
		  	{ title: '收费周期(月)', dataIndex: 'charge_cycle', key: 'charge_cycle' },
		  	{ title: '滞纳金比率‰', dataIndex: 'charge_late', key: 'charge_late' },
		  	{ title: '超过天数', dataIndex: 'over_day', key: 'over_day' },
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.props.deleteCost(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    console.log(this.props)
	    const data = [];
	    if (this.props.costList) {
	      this.props.costList.forEach(v=>{
	        data.push({
	          key: v._id,
	          charge_num:  v.charge_num,
	          charge_name: v.charge_name,
	          company: v.company||'',
	          charge_way: v.charge_way||'',
	          unit_price: v.unit_price||'',
	          charge_cycle: v.charge_cycle||'',
	          charge_late: v.charge_late||'',
	          over_day: v.over_day||'',
	        })
	      })
	    }
	    
	    const rowSelection = {
	      onChange: (selectedRowKeys, selectedRows) => {
	        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	      }
	    };
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div>
	    		<Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
	    		<Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1300 }} />

	    		<ConventionalCostModal
					title={this.state.isAdd?'新增':'修改'}
					visible={this.state.visible}
					defaultData={this.state.defaultData}
					handleOk={this.state.defaultData?this.handleUpdateOk:this.handleAddOk}
					handleCancel={this.handleCancel}
					getFieldDecorator={getFieldDecorator}
				/>
	    	</div>
	    )
  	}
}

export default Form.create()(ConventionalCostTable)
