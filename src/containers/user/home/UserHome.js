import React from 'react'
import { Row, Col, Card, Timeline, Icon, Breadcrumb, Table } from 'antd';
import EchartsViews from '../../../components/chart/EchartsViews';
import EchartsProjects from '../../../components/chart/EchartsProjects';
import EchartsPie from '../../../components/chart/EchartsPie'
import AutoPlay from '../../../components/banner/AutoPlay'
import b1 from '../../../style/imgs/b1.jpg';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getFamilyMemberNum } from '../../../actions/userinfo'
import { getGarageNum } from '../../../actions/garage'
import { getRoomNum } from '../../../actions/room'
import { getAnnouncementNum, getAnnouncementTopic } from '../../../actions/announcement'
import { getComplaintContent } from '../../../actions/complaint'
import { getRepairContent } from '../../../actions/repair'
import { getChargeMoney } from '../../../actions/charge'

@connect(
	state=>({
		userinfo: state.userinfo,
		garage: state.garage,
		room: state.room,
        announcement: state.announcement,
        complaint: state.complaint,
        repair: state.repair,
        charge: state.charge,
	}), {
		getFamilyMemberNum,
		getGarageNum,
		getRoomNum,
        getAnnouncementNum,
        getAnnouncementTopic,
        getComplaintContent,
        getRepairContent,
        getChargeMoney,
	}
)
@withRouter
class UserHome extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ownername: JSON.parse(localStorage.getItem('user')).name,
			ownerid: JSON.parse(localStorage.getItem('user'))._id,
            money: [],
            chargeNameList: [],
		}
	}
	componentDidMount() {
        this.getChargeMoney()
		this.getGarageNum()
		this.getRoomNum()
		this.getFamilyMemberNum()
        this.getAnnouncementNum()
        this.getAnnouncementTopic()
        this.getComplaintContent()
        this.getRepairContent()
	}
    getChargeMoney = () => {
        this.props.getChargeMoney(this.state.ownername).then(()=>{
            const data = [], name = [];
            this.props.charge.chargemoney.forEach((item)=>{
                item.forEach((v)=>{
                    let amount = v.charge_unit * v.cost_id.unit_price
                    data.push(amount)
                    name.push(v.cost_id.charge_name)
                })
            })
            this.setState({money: data, chargeNameList: name})
        })
    }
	getGarageNum = () => {
		this.props.getGarageNum(this.state.ownername)
	}
	getRoomNum = () => {
		this.props.getRoomNum(this.state.ownername)
	}
	getFamilyMemberNum = () => {
		this.props.getFamilyMemberNum(this.state.ownerid)
	}
    getAnnouncementNum = () => {
        this.props.getAnnouncementNum()
    }
    getAnnouncementTopic = () => {
        this.props.getAnnouncementTopic()
    }
    getComplaintContent = () => {
        this.props.getComplaintContent(this.state.ownerid)
    }
    getRepairContent = () => {
        this.props.getRepairContent(this.state.ownerid)
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
                        
                        <Col className="gutter-row" md={6}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div
                                        className="clear y-center"
                                        onClick={()=>{
                                            this.props.history.push('/user/owner/garageinfo')
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
                                    		this.props.history.push('/user/owner/houseinfo')
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
                                            this.props.history.push('/user/owner/personinfo')
                                        }}
                                    >
                                        <div className="pull-left mr-m">
                                            <Icon type="user" className="text-2x text-success" />
                                        </div>
                                        <div className="clear">
                                            <div className="text-muted">家属</div>
                                            <h2>{`${this.props.userinfo.membernum}人`}</h2>
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
                                            this.props.history.push('/user/announcement')
                                        }}
                                    >
                                        <div className="pull-left mr-m">
                                            <Icon type="notification" className="text-2x text-danger" />
                                        </div>
                                        <div className="clear">
                                            <div className="text-muted">公告</div>
                                            <h2>{`${this.props.announcement.announcementnum}条`}</h2>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card bordered={false} className={'no-padding'}>
                                    <EchartsProjects
                                        money={this.state.money}
                                        chargeNameList={this.state.chargeNameList}
                                    />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3><a onClick={()=>{this.props.history.push('/user/announcement')}}>公告</a></h3>
                                        <small>10个已经完成，2个待完成，1个正在进行中</small>
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
                                        <h3><a onClick={()=>{this.props.history.push('/user/complaint')}}>我的投诉</a></h3>
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
                                        <h3><a onClick={()=>{this.props.history.push('/user/repair')}}>我的维修</a></h3>
                                        <small>最近7天用户访问量</small>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <Table pagination={{hideOnSinglePage: true}} columns={repairColumns} dataSource={repairData} />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    {/*<Row gutter={10}>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3>公告</h3>
                                        <small>10个已经完成，2个待完成，1个正在进行中</small>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <Timeline>
                                        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                                        <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                                        <Timeline.Item color="red">
                                            <p>联调接口</p>
                                            <p>功能验收</p>
                                        </Timeline.Item>

                                        <Timeline.Item color="#108ee9">
                                            <p>登录功能设计</p>
                                            <p>权限验证</p>
                                            <p>页面排版</p>
                                        </Timeline.Item>
                                    </Timeline>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3>消息栏</h3>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <ul className="list-group no-border">
                                        <li className="list-group-item">
                                            <span className="pull-left w-40 mr-m">
                                                <img src={b1} className="img-responsive img-circle" alt="test" />
                                            </span>
                                            <div className="clear">
                                                <span className="block">鸣人</span>
                                                <span className="text-muted">终于当上火影了！</span>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <span className="pull-left w-40 mr-m">
                                                <img src={b1} className="img-responsive img-circle" alt="test" />
                                            </span>
                                            <div className="clear">
                                                <span className="block">佐助</span>
                                                <span className="text-muted">吊车尾~~</span>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <span className="pull-left w-40 mr-m">
                                                <img src={b1} className="img-responsive img-circle" alt="test" />
                                            </span>
                                            <div className="clear">
                                                <span className="block">小樱</span>
                                                <span className="text-muted">佐助，你好帅！</span>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <span className="pull-left w-40 mr-m">
                                                <img src={b1} className="img-responsive img-circle" alt="test" />
                                            </span>
                                            <div className="clear">
                                                <span className="block">雏田</span>
                                                <span className="text-muted">鸣人君。。。那个。。。我。。喜欢你..</span>
                                            </div>
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="pb-m">
                                        <h3>访问量统计</h3>
                                        <small>最近7天用户访问量</small>
                                    </div>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <EchartsViews />
                                </Card>
                            </div>
                        </Col>
                    </Row>*/}
                    {/*<Row gutter={10}>
                    	<Col className="gutter-row" md={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <span className="card-tool"><Icon type="sync" /></span>
                                    <EchartsPie />
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" md={16}>
                            <div className="gutter-box">
                                <Card bordered={false} className={'no-padding'}>
                                    <EchartsProjects />
                                </Card>
                            </div>
                        </Col>
                    </Row>*/}
                </div>
            </div>
		)
	}
}

export default UserHome
