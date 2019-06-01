import React from 'react'
import { Table, Button, Form, Tag, Divider, message } from 'antd';
import moment from 'moment'
import SearchButton from '../button/SearchButton'
import {withRouter} from 'react-router-dom'

@withRouter
class AnnouncementManageTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			isAdd: true,
			defaultData: '',
		}
	}

	showAddModal = () => {
	    this.props.history.push(`/admin/announcement/detail/new`)
  	}

  	changeStatus = (record, status) => {
  		if (record.status==='已发布'&&status==='已发布') {
  			message.warning('该公告已经发布！')
  		} else {
  			const { key, ...data } = record
	  		const values = {...data, status: status, _id: key}
	  		this.props.changeStatus(values)
  		}
  	}

  	render() {
  		const columns = [
		  	{
		  		title: '公告主题',
		  		width: 200,
		  		dataIndex: 'topic',
		  		key: 'topic',
		  		fixed: 'left',
		  		render: (text, record) => (
		  			<a onClick={()=>{this.props.history.push(`/admin/announcement/detail/${record.key}`)}}>{text}</a>
		  		),
		  	},
		  	{ title: '公告分类', dataIndex: 'category', key: 'category' },
		  	{ title: '允许查看用户', dataIndex: 'user_scope', key: 'user_scope' },
		  	{ title: '开始时间', dataIndex: 'start_time', key: 'start_time' },
		  	{ title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
		  	{ title: '管理员', dataIndex: 'admin_name', key: 'admin_name' },
		  	{ title: '公告状态', dataIndex: 'status', key: 'status' },
		  	{ title: '录入时间', dataIndex: 'entry_time', key: 'entry_time' },
		  	{
			    title: '操作',
			    key: 'operation',
			    fixed: 'right',
			    width: 100,
			    render: (text, record) => (
			    	<span>
				    	<Tag color="blue" onClick={()=>{this.changeStatus(record, '已发布')}}>发布</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="yellow" onClick={()=>{this.changeStatus(record, '停用')}}>停用</Tag>
				      	<Divider type="vertical" />
				      	<Tag color="red" onClick={()=>{this.props.deleteAnnouncement(record.key)}}>删除</Tag>
				    </span>
			    ),
		  	},
		];
	    const data = [];
	    if (this.props.announcementList) {
	      this.props.announcementList.forEach(v=>{
	        data.push({
	          key: v._id,
	          topic:  v.topic,
	          category: v.category,
	          user_scope: v.user_scope||'',
	          start_time: moment(v.start_time).format('YYYY-MM-DD')||'',
	          end_time: moment(v.end_time).format('YYYY-MM-DD')||'',
	          admin_name: v.admin_name||'',
	          status: v.status||'',
	          entry_time: moment(v.entry_time).format('YYYY-MM-DD')||'',
	          content: v.content||'',
	        })
	      })
	    }
	    
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div>
	    		<Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
	    		<SearchButton handleSearch={this.props.handleSearch} />
	    		<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />

	    	</div>
	    )
  	}
}

export default Form.create()(AnnouncementManageTable)
