import React from 'react'
import { Table, Button, Form, Tag, Divider } from 'antd';
import CommunityModal from '../modal/CommunityModal'
import {withRouter} from 'react-router-dom'

@withRouter
class CommunityTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			isAdd: true,
			defaultData: '',
			breadcrumb: '',
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
          		this.props.addCommunity(values)
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
  				this.props.updateCommunity(data)
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
		    	title: '小区名称',
		    	width: 100,
		    	dataIndex: 'community_name',
		    	key: 'community_name',
		    	fixed: 'left',
		    	render: (text, record) => (
		    		<a onClick={()=>{this.props.history.push(`/admin/house/building/${record.key}`)}}>{text}</a>
		    	)
		  	},
		  	{
		    	title: '所属公司', width: 100, dataIndex: 'company', key: 'company', fixed: 'left',
		  	},
		  	{ title: '占地面积', dataIndex: 'cover_area', key: 'cover_area' },
		  	{ title: '绿地面积', dataIndex: 'green_area', key: 'green_area' },
		  	{ title: '建筑面积', dataIndex: 'construction_area', key: 'construction_area' },
		  	{ title: '道路面积', dataIndex: 'road_area', key: 'road_area' },
		  	{ title: '负责人', dataIndex: 'admin_id', key: 'admin_id' },
		  	{ title: '小区地址', dataIndex: 'community_address', key: 'community_address' },
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.props.deleteCommunity(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    console.log(this.props)
	    const data = [];
	    if (this.props.community) {
	      this.props.community.forEach(v=>{
	        data.push({
	          key: v._id,
	          community_name:  v.community_name,
	          company: v.company,
	          cover_area: v.cover_area||'',
	          green_area: v.green_area||'',
	          construction_area: v.construction_area||'',
	          road_area: v.road_area||'',
	          admin_id: v.admin_id||'',
	          community_address: v.community_address||'',
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

	    		<CommunityModal
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

export default Form.create()(CommunityTable)
