import React from 'react'
import { Table, Button, Form, Tag, Divider, message } from 'antd';
import { connect } from 'react-redux'
import { getUnitList, addUnit, updateUnit, deleteUnit } from '../../actions/unit'
import UnitModal from '../modal/UnitModal'

@connect(
	state=>state.unit,
	{
		getUnitList,
		addUnit,
		updateUnit,
		deleteUnit,
	}
)
class UnitTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			building_id: this.props.match.params.id,
			visible: false,
			isAdd: true,
			data: '',
			defaultData: '',
		}
	}
	componentDidMount() {
		this.getUnitList()
	}

	getUnitList = () => {
		this.props.getUnitList(this.state.building_id).then(()=>{
			this.setState({
				data: this.props.unit
			})
		})
	}

	addUnit = (values) => {
		this.props.addUnit({building_id: this.state.building_id, ...values}).then(()=>{
			message.success(this.props.msg)
			this.getUnitList()
		})
	}

	updateUnit = (values) => {
		this.props.updateUnit(values).then(()=>{
			message.success(this.props.msg)
			this.getUnitList()
		})
	}

	deleteUnit = (_id) => {
		this.props.deleteUnit(_id).then(()=>{
			message.success(this.props.msg)
			this.getUnitList()
		})
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
          		this.addUnit(values)
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
  				this.updateUnit(data)
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
		    	title: '单元号',
		    	width: 100,
		    	dataIndex: 'unit_name',
		    	key: 'unit_name',
		    	render: (text, record) => (
		    		<a onClick={()=>{this.props.history.push(`/admin/house/room/${record.key}`)}}>{text}</a>
		    	)
		  	},
		  	{ title: '开始楼层', width: 100, dataIndex: 'begin_floor', key: 'begin_floor' },
		  	{ title: '结束楼层', dataIndex: 'end_floor', key: 'end_floor' },
		  	{ title: '开始房号', dataIndex: 'start_num', key: 'start_num' },
		  	{ title: '结束房号', dataIndex: 'end_num', key: 'end_num' },
		  	{ title: '备注', dataIndex: 'note', key: 'note' },
		  	{
			    title: '操作',
			    key: 'operation',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.deleteUnit(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.state.data) {
	      this.state.data.forEach(v=>{
	        data.push({
	          key: v._id,
	          unit_name:  v.unit_name,
	          begin_floor: v.begin_floor,
	          end_floor: v.end_floor||'',
	          start_num: v.start_num||'',
	          end_num: v.end_num||'',
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
	    	<div className="management">
	    		<Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
	    		<Button className="management_button" onClick={()=>{this.props.history.goBack()}}>返回</Button>
	    		<Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 800 }} />

	    		<UnitModal
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

export default Form.create()(UnitTable)
