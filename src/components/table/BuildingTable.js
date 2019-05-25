import React from 'react'
import moment from 'moment'
import { Table, Button, Form, Tag, Divider, message } from 'antd';
import { connect } from 'react-redux'
import { getBuildingList, addBuilding, updateBuilding, deleteBuilding } from '../../actions/building'
import BuildingModal from '../modal/BuildingModal'
import SearchButton from '../button/SearchButton'

@connect(
	state=>state.building,
	{
		getBuildingList,
		addBuilding,
		updateBuilding,
		deleteBuilding,
	}
)
class BuildingTable extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props)
		this.state = {
			community_id: this.props.match.params.id,
			visible: false,
			isAdd: true,
			data: '',
			defaultData: '',
		}
	}
	componentDidMount() {
		this.getBuildingList()
	}

	getBuildingList = () => {
		this.props.getBuildingList(this.state.community_id).then(()=>{
			this.setState({
				data: this.props.building
			})
		})
	}

	addBuilding = (values) => {
		this.props.addBuilding({community_id: this.state.community_id, ...values}).then(()=>{
			message.success(this.props.msg)
			this.getBuildingList()
		})
	}

	updateBuilding = (values) => {
		this.props.updateBuilding(values).then(()=>{
			message.success(this.props.msg)
			this.getBuildingList()
		})
	}

	deleteBuilding = (_id) => {
		this.props.deleteBuilding(_id).then(()=>{
			message.success(this.props.msg)
			this.getBuildingList()
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
          		console.info('success', values);
          		this.addBuilding(values)
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
  				this.updateBuilding(data)
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

  	handleSearch = (value) => {
		this.props.getBuildingList(this.state.community_id, value).then(()=>{
			this.setState({
				data: this.props.building
			})
		})
	}

  	render() {
  		const columns = [
		  	{
		    	title: '楼号',
		    	width: 100,
		    	dataIndex: 'building_name',
		    	key: 'building_name',
		    	fixed: 'left',
		    	render: (text, record) => (
		    		<a onClick={()=>{this.props.history.push(`/admin/house/unit/${record.key}`)}}>{text}</a>
		    	)
		  	},
		  	{ title: '楼宇功能', width: 100, dataIndex: 'building_function', key: 'building_function' },
		  	{ title: '结构类别', dataIndex: 'structure_category', key: 'structure_category' },
		  	{ title: '装修标准', dataIndex: 'decorate_standard', key: 'decorate_standard' },
		  	{ title: '使用面积', dataIndex: 'using_area', key: 'using_area' },
		  	{ title: '建筑面积', dataIndex: 'construction_area', key: 'construction_area' },
		  	{ title: '建筑许可证', dataIndex: 'building_permit', key: 'building_permit' },
		  	{ title: '预售许可证', dataIndex: 'presale_permit', key: 'presale_permit' },
		  	{ title: '竣工日期', dataIndex: 'completion_date', key: 'completion_date' },
		  	{ title: '封顶日期', dataIndex: 'cap_date', key: 'cap_date' },
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
				      	<Tag color="red" onClick={()=>{this.deleteBuilding(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.state.data) {
	      this.state.data.forEach(v=>{
	        data.push({
	          key: v._id,
	          building_name:  v.building_name,
	          building_function: v.building_function,
	          structure_category: v.structure_category||'',
	          decorate_standard: v.decorate_standard||'',
	          using_area: v.using_area||'',
	          construction_area: v.construction_area||'',
	          building_permit: v.building_permit||'',
	          presale_permit: v.presale_permit||'',
	          completion_date: moment(v.completion_date).format('YYYY-MM-DD')||'',
	          cap_date: moment(v.cap_date).format('YYYY-MM-DD')||'',
	          note: v.note||'',
	        })
	      })
	    }
	    
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div className="management">
	    		<Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
	    		<Button className="management_button" onClick={()=>{this.props.history.goBack()}}>返回</Button>
	    		<SearchButton handleSearch={this.handleSearch} />
	    		<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />

	    		<BuildingModal
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

export default Form.create()(BuildingTable)
