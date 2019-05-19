import React from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd';
import EchartsViews from '../../../components/chart/EchartsViews';
import EchartsProjects from '../../../components/chart/EchartsProjects';
import EchartsPie from '../../../components/chart/EchartsPie'
import b1 from '../../../style/imgs/b1.jpg';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getOwnerNum, getAdminNum } from '../../../actions/admininfo'
import { getGarageNum } from '../../../actions/garage'
import { getRoomNum } from '../../../actions/room'

@connect(
	state=>({
		admininfo: state.admininfo,
		garage: state.garage,
		room: state.room,
	}), {
		getOwnerNum,
		getAdminNum,
		getGarageNum,
		getRoomNum,
	}
)
@withRouter
class AdminHome extends React.Component {
	componentDidMount() {
		this.getOwnerNum()
		this.getAdminNum()
		this.getGarageNum()
		this.getRoomNum()
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
	render() {
		return (
			<div className="gutter-example button-demo">
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
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
                    <Col className="gutter-row" md={4}>
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
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
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
                    <Col className="gutter-row" md={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>任务</h3>
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
                </Row>
                <Row gutter={10}>
                	<Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                {/*<div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>*/}
                                <span className="card-tool"><Icon type="sync" /></span>
                                <EchartsPie />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
		)
	}
}

export default AdminHome
