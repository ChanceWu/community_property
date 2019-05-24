import React from 'react'
import { message, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import AnnouncementInfoTable from '../../../components/table/AnnouncementInfoTable'
import { getAnnouncementListByStatus, readAnnouncement } from '../../../actions/announcement'

@connect(
	state=>state.announcement,
	{
		getAnnouncementListByStatus,
		readAnnouncement,
	}
)
class AnnouncementInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user_id: JSON.parse(localStorage.getItem('user'))._id,
			announcementList: ''
		}
	}
	componentDidMount() {
		this.readAnnouncement()
	}
	readAnnouncement = () => {
		const { user_id } = this.state
		this.props.readAnnouncement(user_id).then(()=>{
			this.getAnnouncementListByStatus()
		})
	}
	getAnnouncementListByStatus = () => {
		this.props.getAnnouncementListByStatus('已发布').then(()=>{
			this.setState({
				announcementList: this.props.announcement
			})
		})
	}
	handleSearch = (value) => {
		this.props.getAnnouncementListByStatus('已发布', value).then(()=>{
			this.setState({
				announcementList: this.props.announcement
			})
		})
	}
	render() {
		return (
			<div>
				<Breadcrumb>
				    <Breadcrumb.Item href="/user/home">
					      <Icon type="home" />
					    </Breadcrumb.Item>
					    <Breadcrumb.Item href="/user/announcement">
					      <span>公告</span>
					    </Breadcrumb.Item>
			  	</Breadcrumb>
				<div className="management">
					<AnnouncementInfoTable
						announcementList={this.state.announcementList}
						handleSearch={this.handleSearch}
					/>
				</div>
			</div>
		)
	}
}

export default AnnouncementInfo
