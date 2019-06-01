import React from 'react'
import { Row, Col, Card, Timeline, Icon, Breadcrumb, Table } from 'antd';
import EchartsViews from '../../../components/chart/EchartsViews';
import EchartsProjects from '../../../components/chart/EchartsProjects';
import EchartsPie from '../../../components/chart/EchartsPie'
import AutoPlay from '../../../components/banner/AutoPlay'
import b1 from '../../../style/imgs/b1.jpg';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getOwnerNum, getAdminNum } from '../../../actions/admininfo'
import { getGarageNum } from '../../../actions/garage'
import { getRoomNum } from '../../../actions/room'
import { getAnnouncementTopic } from '../../../actions/announcement'
import { getComplaintContent } from '../../../actions/complaint'
import { getRepairContent } from '../../../actions/repair'

@connect(
	state=>({
		admininfo: state.admininfo,
		garage: state.garage,
		room: state.room,
        announcement: state.announcement,
        complaint: state.complaint,
        repair: state.repair,
	}), {
		getOwnerNum,
		getAdminNum,
		getGarageNum,
		getRoomNum,
        getAnnouncementTopic,
        getComplaintContent,
        getRepairContent,
	}
)
@withRouter
class AdminHome extends React.Component {
	componentDidMount() {
		this.getOwnerNum()
		this.getAdminNum()
		this.getGarageNum()
		this.getRoomNum()
        this.getAnnouncementTopic()
        this.getComplaintContent()
        this.getRepairContent()
	}
	getOwnerNum = () => {
		this.props.getOwnerNum()
	}
	getAdminNum = () => {
		this.props.getAdminNum()
	}
	getGarageNum = () => {
		this.props.getGarageNum()
	}
	getRoomNum = () => {
		this.props.getRoomNum()
	}
    getAnnouncementTopic = () => {
        this.props.getAnnouncementTopic()
    }
    getComplaintContent = () => {
        this.props.getComplaintContent()
    }
    getRepairContent = () => {
        this.props.getRepairContent()
    }
	render() {
        const announcementColumns = [{
            title: '公告标题',
            dataIndex: 'topic',
            render: (text, record) => (
                <a onClick={()=>{this.props.history.push(`/user/announcement/detail/${record.key}`)}}>{text}</a>
            ),
        }];
        const announcementData = [];
        if (this.props.announcement&&this.props.announcement.announcementtopic) {
          this.props.announcement.announcementtopic.forEach(v=>{
            announcementData.push({
              key: v._id,
              topic:  v.topic||'',
            })
          })
        }

        const complaintColumns = [{
            title: '投诉内容',
            dataIndex: 'complaint_content',
            /*render: (text, record) => (
                <a onClick={()=>{this.props.history.push(`/user/announcement/detail/${record.key}`)}}>{text}</a>
            ),*/
        }];
        const complaintData = [];
        if (this.props.complaint&&this.props.complaint.complaintcontent) {
          this.props.complaint.complaintcontent.forEach(v=>{
            complaintData.push({
              key: v._id,
              complaint_content:  v.complaint_content||'',
            })
          })
        }

        const repairColumns = [{
            title: '投诉内容',
            dataIndex: 'repair_content',
            /*render: (text, record) => (
                <a onClick={()=>{this.props.history.push(`/user/announcement/detail/${record.key}`)}}>{text}</a>
            ),*/
        }];
        const repairData = [];
        if (this.props.repair&&this.props.repair.repaircontent) {
          this.props.repair.repaircontent.forEach(v=>{
            repairData.push({
              key: v._id,
              repair_content:  v.repair_content||'',
            })
          })
        }
		return (
            <div>
                {/*<Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                      <span>首页</span>
                    </Breadcrumb.Item>
                </Breadcrumb>*/}
    			<div className="gutter-example button-demo">
                    <Row gutter={10}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card bordered={false} className={'no-padding'}>
                                    <AutoPlay />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col className="gutter-row" md={6}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div
                                        className="clear y-center"
                                        onClick={()=>{
                                            this.props.history.push('/admin/owner/infomation')
                                        }}
                                    >
                                        <div className="pull-left mr-m">
                                            <Icon type="user" className="text-2x text-danger" />
                                        </div>
                                        <div className="clear">
                                            <div className="text-muted">业主</div>
                                            <h2>{`${this.props.admininfo.ownernum}人`}</h2>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={6}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div
                                        className="clear y-center"
                                        onClick={()=>{
                                            this.props.history.push('/admin/garage/garagemanage')
                                        }}
                                    >
                                        <div className="pull-left mr-m">
                                            <Icon type="car" className="text-2x" />
                                        </div>
                                        <div className="clear">
                                            <div className="text-muted">车位</div>
                                            <h2>{`${this.props.garage.garagenum}个`}</h2>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={6}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div
                                        className="clear y-center"
                                        onClick={()=>{
                                            this.props.history.push('/admin/house/infomation')
                                        }}
                                    >
                                        <div className="pull-left mr-m">
                                            <Icon type="home" className="text-2x text-info" />
                                        </div>
                                        <div className="clear">
                                            <div className="text-muted">房屋</div>
                                            <h2>{`${this.props.room.roomnum}间`}</h2>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={6}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div
                                        className="clear y-center"
                                        onClick={()=>{
                                            this.props.history.push('/admin/admin/infomation')
                                        }}
                                    >
                                        <div className="pull-left mr-m">
                                            <Icon type="setting" className="text-2x text-success" />
                                        </div>
                                        <div className="clear">
                                            <div className="text-muted">管理员</div>
                                            <h2>{`${this.props.admininfo.adminnum}人`}</h2>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    {/*<Row gutter={10}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card bordered={false} className={'no-padding'}>
                                    <EchartsProjects />
                                </Card>
                            </div>
                        </Col>
                    </Row>*/}
                    <Row gutter={10}>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3><a onClick={()=>{this.props.history.push('/admin/announcement/announcementmanage')}}>公告</a></h3>
                                        <small>近期发布的公告</small>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <Table pagination={{hideOnSinglePage: true}} columns={announcementColumns} dataSource={announcementData} />
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3><a onClick={()=>{this.props.history.push('/admin/complaint/complaintmanage')}}>投诉</a></h3>
                                        <small>业主近期反馈的投诉信息</small>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <Table pagination={{hideOnSinglePage: true}} columns={complaintColumns} dataSource={complaintData} />
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3><a onClick={()=>{this.props.history.push('/admin/repair/repairmanage')}}>维修</a></h3>
                                        <small>业主最近申请的维修信息</small>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <Table pagination={{hideOnSinglePage: true}} columns={repairColumns} dataSource={repairData} />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
		)
	}
}

export default AdminHome
