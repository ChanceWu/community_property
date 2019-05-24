import React from 'react'
import { Table, Button, Form, Tag, Divider } from 'antd';
import moment from 'moment'
import SearchButton from '../button/SearchButton'
import {withRouter} from 'react-router-dom'

@withRouter
class AnnouncementInfoTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			isAdd: true,
			defaultData: '',
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
		  			<a onClick={()=>{this.props.history.push(`/user/announcement/detail/${record.key}`)}}>{text}</a>
		  		),
		  	},
		  	{ title: '公告分类', dataIndex: 'category', key: 'category' },
		  	{ title: '允许查看用户', dataIndex: 'user_scope', key: 'user_scope' },
		  	{ title: '开始时间', dataIndex: 'start_time', key: 'start_time' },
		  	{ title: '结束时间', dataIndex: 'end_time', key: 'end_time' },
		  	{ title: '管理员', dataIndex: 'admin_name', key: 'admin_name' },
		  	{ title: '公告状态', dataIndex: 'status', key: 'status' },
		  	{ title: '录入时间', dataIndex: 'entry_time', key: 'entry_time' },
		];
	    console.log(this.props)
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
	          entry_time: v.entry_time||'',
	          content: v.content||'',
	        })
	      })
	    }
	    
	    const { getFieldDecorator } = this.props.form;
	    return (
	    	<div>
	    		<SearchButton handleSearch={this.props.handleSearch} />
	    		<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />

	    	</div>
	    )
  	}
}

export default Form.create()(AnnouncementInfoTable)
