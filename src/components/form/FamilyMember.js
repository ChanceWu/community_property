import React from 'react'
import { Table, Divider, Tag, Button, Modal } from 'antd';

class FamilyMember extends React.Component {
	state = { visible: false }

	showModal = () => {
	    this.setState({
	      	visible: true,
	    });
  	}

  	handleOk = (e) => {
	    console.log(e);
	    this.setState({
	      	visible: false,
	    });
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
		  render: text => <a href="javascript:;">{text}</a>,
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
		}, {
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
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <a href="javascript:;">查看详情</a>
		      <Divider type="vertical" />
		      <a href="javascript:;">删除</a>
		    </span>
		  ),
		}];

		const data = [{
		  key: '1',
		  name: 'John Brown',
		  gender: '女',
		  age: 32,
		  relationship: '夫妻',
		  tags: ['nice', 'developer'],
		}, {
		  key: '2',
		  name: 'Jim Green',
		  gender: '男',
		  age: 12,
		  relationship: '父子',
		  tags: ['loser'],
		}, {
		  key: '3',
		  name: 'Joe Black',
		  gender: '男',
		  age: 5,
		  relationship: '父子',
		  tags: ['cool', 'teacher'],
		}];
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>新增</Button>
				<Table columns={columns} dataSource={data} />

				<Modal
		          title="新增"
		          visible={this.state.visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		        >
		          <p>Some contents...</p>
		          <p>Some contents...</p>
		          <p>Some contents...</p>
		        </Modal>
			</div>
		)
	}
}

export default FamilyMember
