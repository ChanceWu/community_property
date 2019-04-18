
import React from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/layout/SiderCustom';
import HeaderCustom from './components/layout/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { connect } from 'react-redux'
// import { ThemePicker } from './components/widget';
// import { connectAlita } from 'redux-alita';

const { Content, Footer } = Layout;

@connect(
  state=>state
)
class App extends React.Component {
    state = {
        collapsed: false,
        title: 'App'
    };
    componentWillMount() {
      console.log(this.props)
      /*const { setAlitaState } = this.props;
      const user = JSON.parse(localStorage.getItem('user'));
      // user && receiveData(user, 'auth');
      user && setAlitaState({ stateName: 'auth', data: user });
      // receiveData({a: 213}, 'auth');
      // fetchData({funcName: 'admin', stateName: 'auth'});
      this.getClientWidth();
      window.onresize = () => {
          console.log('屏幕变化了');
          this.getClientWidth();
      }*/
    }
    componentDidMount() {
        
    }
    /*getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const { setAlitaState } = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);
        setAlitaState({ stateName: 'responsive', data: { isMobile: clientWidth <= 992 } });
        // receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };*/
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { title } = this.state;
        /*const { auth = { data: {} }, responsive = { data: {} } } = this.props;*/
        return (
            <DocumentTitle title={title}>
                <Layout>
                    {true && <SiderCustom auth={this.props.auth} collapsed={this.state.collapsed} />}
                    {/*<ThemePicker />*/}
                    <Layout style={{flexDirection: 'column'}}>
                        <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={'auth.data' || {}} />
                        <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                            <Routes auth={this.props.auth} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                        React-Admin ©{new Date().getFullYear()} Created by 865470087@qq.com
                        </Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default App;