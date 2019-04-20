
import React from 'react';
import DocumentTitle from 'react-document-title';
import { Layout, notification, Icon } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SiderCustom from './components/layout/SiderCustom';
import HeaderCustom from './components/layout/HeaderCustom';
import Routes from './routes';

const { Content, Footer } = Layout;

@connect(
  state=>state
)
class App extends React.Component {
    state = {
        collapsed: false,
        title: 'App'
    };
    componentDidMount() {
        console.log(this.props)
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { title } = this.state;
        const { redirectTo } = this.props.auth;
        console.log(this.props)
        return (
            <DocumentTitle title={title}>
                {redirectTo&&redirectTo==='/login'?<Redirect to={redirectTo}/>:(
                    <Layout>
                        {true && <SiderCustom auth={this.props.auth} collapsed={this.state.collapsed} />}
                        <Layout style={{flexDirection: 'column'}}>
                            <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={'auth.data' || {}} />
                            <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                                <Routes auth={this.props.auth} />
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                            小区物业管理系统 ©{new Date().getFullYear()} Created by Chance
                            </Footer>
                        </Layout>
                    </Layout>
                )}
                
            </DocumentTitle>
        );
    }
}

export default App;