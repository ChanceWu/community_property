import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import reducers from './reducers/index';
import Login from './containers/login/login';
import Register from './containers/register/register';
import NotFound from './components/pages/NotFound';
import AuthRoute from './components/auth/authroute';
// import AdminHome from './components/adminHome/AdminHome'
import './index.less';
import './style/lib/animate.css';
import './style/antd/index.less';
import './style/index.less';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<AuthRoute />
			<Switch>
				<Route exact path="/admin" render={() => <Redirect to="/admin/home" push />} />
				<Route exact path="/user" render={() => <Redirect to="/user/home" push />} />        
				<Route path='/admin' component={App} />
				<Route path='/user' component={App} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				{/*<Route exact path='/admin/adminHome/AdminHome' component={AdminHome} />*/}
				<Route path="/404" component={NotFound} />
				{/*<Route path='/admin' component={Admin} />
				<Route path='/user' component={Register} />*/}
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
