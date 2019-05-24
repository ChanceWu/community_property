import React from 'react'
import { Table, Button, Form, Tag, Divider, Input } from 'antd';
import GarageManageModal from '../modal/GarageManageModal'
import {withRouter} from 'react-router-dom'
import SearchButton from '../button/SearchButton'

@withRouter
class GarageManageTable extends React.Component {
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
          		this.props.addGarage(values)
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
  				this.props.updateGarage(data)
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
		    	title: '车位编号',
		    	width: 100,
		    	dataIndex: 'garage_num',
		    	key: 'garage_num',
		    	fixed: 'left',
		  	},
		  	{
		  		title: '所属业主', width: 100, dataIndex: 'user_name', key: 'user_name', fixed: 'left',
		  	},
		  	{ title: '所属房产', width: 100, dataIndex: 'community_name', key: 'community_name' },
		  	{ title: '车位类别', dataIndex: 'garage_category', key: 'garage_category' },
		  	{ title: '管理类别', dataIndex: 'manage_category', key: 'manage_category' },
		  	{ title: '车位类型', dataIndex: 'garage_type', key: 'garage_type' },
		  	{ title: '预售价格', dataIndex: 'booking_price', key: 'booking_price' },
		  	{ title: '预租价格', dataIndex: 'rent_price', key: 'rent_price' },
		  	{ title: '车位位置', dataIndex: 'garage_location', key: 'garage_location' },
		  	{ title: '车位面积', dataIndex: 'garage_area', key: 'garage_area' },
		  	{ title: '当前状态', dataIndex: 'garage_state', key: 'garage_state' },
		  	{ title: '备注', dataIndex: 'note', key: 'note' },
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.props.deleteGarage(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.props.garageList) {
	      this.props.garageList.forEach(v=>{
	        data.push({
	          key: v._id,
	          user_name: v.user_name||'',
	          garage_num:  v.garage_num,
	          community_name: v.community_name,
	          garage_category: v.garage_category||'',
	          manage_category: v.manage_category||'',
	          garage_type: v.garage_type||'',
	          booking_price: v.booking_price||'',
	          rent_price: v.rent_price||'',
	          garage_location: v.garage_location||'',
	          garage_area: v.garage_area||'',
	          garage_state: v.garage_state||'',
	          note: v.note||'',
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
	    		<SearchButton handleSearch={this.props.handleSearch} />
		        
	    		<Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1300 }} />

	    		<GarageManageModal
					title={this.state.isAdd?'新增':'修改'}
					visible={this.state.visible}
					defaultData={this.state.defaultData}
					handleOk={this.state.defaultData?this.handleUpdateOk:this.handleAddOk}
					handleCancel={this.handleCancel}
					getFieldDecorator={getFieldDecorator}
					communityName={this.props.communityName}
					ownerName={this.props.ownerName}
				/>
	    	</div>
	    )
  	}
}

export default Form.create()(GarageManageTable)
