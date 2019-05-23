import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import AnnouncementManageTable from '../../../components/table/AnnouncementManageTable'
import {
	getAnnouncementList,
	addAnnouncement,
	updateAnnouncement,
	deleteAnnouncement,
	sendAnnouncement,
	recvAnnouncement,
} from '../../../actions/announcement'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
	state=>state.announcement,
	{
		getAnnouncementList,
		addAnnouncement,
		updateAnnouncement,
		deleteAnnouncement,
		sendAnnouncement,
		recvAnnouncement,
	}
)
class AnnouncementManage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			announcementList: ''
		}
	}
	componentDidMount() {
		this.getAnnouncementList()
	}
    /*componentWillUpdate(nextProps, nextState) {
        if(nextProps.unread!==this.props.unread) {
            this.props.recvAnnouncement().then(()=>{
                this.getAnnouncementList()
            })
        }
    }*/
    componentWillUpdate(nextProps, nextState) {
    	console.log(nextProps.unread, this.props.unread)
        if(nextProps.unread!==this.props.unread) {
            console.log(nextProps.unread, this.props.unread)
            this.getAnnouncementList()
        }
    }
	getAnnouncementList = () => {
		this.props.getAnnouncementList().then(()=>{
			this.setState({
				announcementList: this.props.announcement
			})
		})
	}
	addAnnouncement = (values) => {
		// const data = Object.assign({}, values, {charge_type: 'conventional'})
		this.props.addAnnouncement(values).then(()=>{
			message.success(this.props.msg)
			this.getAnnouncementList()
		})
	}
	updateAnnouncement = (values) => {
		this.props.updateAnnouncement(values).then(()=>{
			message.success(this.props.msg)
			this.getAnnouncementList()
		})
	}
	deleteAnnouncement = (id) => {
		this.props.deleteAnnouncement(id).then(()=>{
			message.success(this.props.msg)
			this.getAnnouncementList()
		})
	}
	changeStatus = (values) => {
		if (values.status==='已发布') {
			console.log('sss')
			this.sendAnnouncement(values)
		} else {
			this.updateAnnouncement(values)
		}
	}
	sendAnnouncement = (values) => {
		this.props.sendAnnouncement(values)
	}
	render() {
		return (
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/admin/home">
					      <Icon type="home" />
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					      <span>公告管理</span>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/admin/announcement/announcementmanage">
					      <span>公告信息</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<AnnouncementManageTable
						announcementList={this.state.announcementList}
						addAnnouncement={this.addAnnouncement}
						updateAnnouncement={this.updateAnnouncement}
						changeStatus={this.changeStatus}
						deleteAnnouncement={this.deleteAnnouncement}
					/>
				</div>
			</div>
		)
	}
}

export default AnnouncementManage
