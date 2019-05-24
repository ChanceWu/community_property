import React, { Component } from 'react';
// import screenfull from 'screenfull';
import avater from '../../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover, message } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { logout } from '../../actions/auth'
import { getAnnouncementReadList, recvAnnouncement } from '../../actions/announcement'
import './layout.less'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@withRouter
@connect(
	state=>({
        auth: state.auth,
        announcement: state.announcement,
    }), {
        logout,
        getAnnouncementReadList,
        recvAnnouncement,
    }
)
class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        user_id: JSON.parse(localStorage.getItem('user'))._id,
        user_type: JSON.parse(localStorage.getItem('user')).type,
        unread: 0,
    };
    componentDidMount() {
        this.props.getAnnouncementReadList(this.state.user_id).then(()=>{
            this.props.recvAnnouncement()
            this.setState({unread: this.props.announcement.unread})
        })
    };

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.announcement.unread!==this.props.announcement.unread) {
            console.log(nextProps.announcement.unread)
            this.setState({unread: nextProps.announcement.unread})
        }
    }

    /*screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };*/
    menuClick = e => {
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        /* localStorage.removeItem('user');
        this.props.history.push('/login') */
        browserCookie.erase('userid')
        localStorage.removeItem('user')
		this.props.logout()
    };
    render() {
        const { unread, user_type } = this.state
        const { redirectTo } = this.props.auth;
        return (
            <Header className="custom-theme header" >
            	{redirectTo&&redirectTo==='/login'?<Redirect to={redirectTo}/>:null}
                <Icon
                    className="header__trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    {/*<Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>*/}
                    {
                        user_type==='admin'?(
                            <Menu.Item key="1">
                                <Badge count={0} overflowCount={10} style={{marginLeft: 10}}>
                                    <Icon type="notification" />
                                </Badge>
                            </Menu.Item>
                        ):(
                            <Menu.Item key="1" onClick={()=>{this.props.history.push('/user/announcement')}}>
                                <Badge count={unread} overflowCount={10} style={{marginLeft: 10}}>
                                    <Icon type="notification" />
                                </Badge>
                            </Menu.Item>
                        )
                    }
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.auth.name}</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        {/*<MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>*/}
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default HeaderCustom