import React from 'react'
import { Table, Divider, Tag, Button, Modal, Form, Input, Checkbox, Radio } from 'antd';
import FamilyMemberModal from '../modal/FamilyMemberModal'

class FamilyMemberTable extends React.Component {
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
          		this.props.addFamilyMember(values)
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
  				this.props.updateFamilyMember(data)
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
		const columns = [{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		  // render: text => <a href="javascript:;">{text}</a>,
		}, {
		  title: '性别',
		  dataIndex: 'gender',
		  key: 'gender',
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		}, {
		  title: '与户主关系',
		  dataIndex: 'relationship',
		  key: 'relationship',
		},{
		  title: '联系电话',
		  dataIndex: 'telephone',
		  key: 'telephone',
		},
		/*{
		  title: 'Tags',
		  key: 'tags',
		  dataIndex: 'tags',
		  render: tags => (
		    <span>
		      {tags.map(tag => {
		        let color = tag.length > 5 ? 'geekblue' : 'green';
		        if (tag === 'loser') {
		          color = 'volcano';
		        }
		        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
		      })}
		    </span>
		  ),
		}, */
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    	<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
		      	<Divider type="vertical" />
		      	<Tag color="red" onClick={()=>{this.props.deleteFamilyMember(record.key)}}>删除</Tag>
		    </span>
		  ),
		}];

		const data = [];
		this.props.members.forEach((v, i) => {
			data.push({
				key: v._id,
			  	name: v.name,
			  	gender: v.gender?'男':'女',
			  	age: v.age || '',
			  	relationship: v.relationship || '',
			  	telephone: v.telephone || '',
			})
		})
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Button type="primary" onClick={this.showAddModal}>新增</Button>
				<Table columns={columns} dataSource={data} />

				<FamilyMemberModal
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

export default Form.create()(FamilyMemberTable)
