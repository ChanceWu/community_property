import React from 'react'
import { Input, Button, Radio, message, Select, DatePicker } from 'antd';
import moment from 'moment'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getOneAnnouncement, addAnnouncement, updateAnnouncement } from '../../actions/announcement'
import './AnnouncementDetailForm.less'

const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

@connect(
	state=>state.announcement,
	{
		getOneAnnouncement,
		addAnnouncement,
		updateAnnouncement,
	}
)
@withRouter
class AnnouncementDetailForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentAnnouncementId: this.props.match.params.id,
			data: {
				category: '',
				start_time:'',
				end_time: '',
				topic: '',
				content: '',
				user_scope: '所有业主',
				admin_name: JSON.parse(localStorage.getItem('user')).name,
				status: '录入',
				entry_time: new Date(),
			},
		}
	}
	componentDidMount() {
		const { currentAnnouncementId } = this.state
		if (currentAnnouncementId!=="new") {
			this.getOneAnnouncement()
		}
	}
	announcementInfoFormChange = (key, val) => {
		const { data } = this.state
		data[key] = val
		this.setState({
			data: {...data}
		})
	}
	getOneAnnouncement = () => {
		this.props.getOneAnnouncement(this.state.currentAnnouncementId).then(()=>{
			this.setState({
				data: {...this.props.oneannouncement}
			})
		})
	}
	addAnnouncement = () => {
		this.props.addAnnouncement(this.state.data).then(()=>{
			message.success(this.props.msg)
			this.props.history.goBack()
		})
	}
	updateAnnouncement = () => {
		this.props.updateAnnouncement(this.state.data).then(()=>{
			message.success(this.props.msg)
			this.getOneAnnouncement()
		})
	}
	saveAnnouncementInfo = () => {
		const { currentAnnouncementId } = this.state
		if (currentAnnouncementId!=="new") {
			this.updateAnnouncement()
		} else {
			this.addAnnouncement()
		}
	}
	render() {
		const data = this.state.data
		console.log(data)
		return (
			<div>
				<div className="management">
					<Button className="management_button" type="primary" onClick={this.saveAnnouncementInfo}>保存</Button>
					<Button className="management_button" onClick={()=>{this.props.history.goBack()}}>返回</Button>
					<div className="form">
						<div className="form-row">
							<div className="label">公告分类:</div>
							<Select
							    showSearch
							    // style={{ width: 236 }}
							    value={data.category}
							    onChange={v=>this.announcementInfoFormChange('category', v)}
							    placeholder="请选择公告分类"
						  	>
							    <Option key="1" value="活动安排">活动安排</Option>
							    <Option key="2" value="值班公告">值班公告</Option>
							    <Option key="3" value="公务接待">公务接待</Option>
							    <Option key="4" value="温馨提示">温馨提示</Option>
							    <Option key="5" value="业主通知">业主通知</Option>
							    <Option key="6" value="其他公告">其他公告</Option>
					  		</Select>
						</div>
						<div className="form-row">
							<div className="label">开始时间:</div>
							<DatePicker
								value={data.start_time?moment(data.start_time, 'YYYY-MM-DD'):moment('2015-09-13', 'YYYY-MM-DD')}
								onChange={v=>this.announcementInfoFormChange('start_time', v._d)}
							/>
						</div>
						<div className="form-row">
							<div className="label">结束时间:</div>
							<DatePicker
								value={data.end_time?moment(data.end_time, 'YYYY-MM-DD'):moment('2015-09-13', 'YYYY-MM-DD')}
								onChange={v=>this.announcementInfoFormChange('end_time', v._d)}
							/>
						</div>
						<div className="form-row">
							<div className="label">公告主题:</div>
							<Input className="label_topic" value={data.topic} onChange={v=>this.announcementInfoFormChange('topic', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">公告内容:</div>
							<TextArea rows={4} value={data.content} onChange={v=>this.announcementInfoFormChange('content', v.target.value)} />
						</div>
						{/*<div className="form-row">
							<div className="label">允许查看用户:</div>
							<Input value={data.user_scope} onChange={v=>this.announcementInfoFormChange('user_scope', v.target.value)}/>
						</div>*/}
						<div className="form-row">
							<div className="label">管理员:</div>
							<Input value={data.admin_name} onChange={v=>this.announcementInfoFormChange('admin_name', v.target.value)}/>
						</div>
						<div className="form-row">
							<div className="label">公告状态:</div>
							<Select
							    showSearch
							    value={data.status}
							    onChange={v=>this.announcementInfoFormChange('status', v)}
							    placeholder="请选择公告状态"
						  	>
						  		<Option value="录入">录入</Option>
							    <Option value="已发布">已发布</Option>
							    <Option value="停用">停用</Option>
					  		</Select>
						</div>
						{/*<div className="form-row">
							<div className="label">录入时间:</div>
							<Input value={data.entry_time} onChange={v=>this.roomInfoFormChange('entry_time', v.target.value)}/>
						</div>*/}
					</div>
				</div>
			</div>
		)
	}
}

export default AnnouncementDetailForm