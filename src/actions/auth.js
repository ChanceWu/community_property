import axios from 'axios';
import actions from '../constants/actions';

const {
	LOAD_DATA_SUCCESS,
	AUTH_SUCCESS,
	ERROR_MSG,
	LOGOUT_SUCCESS
} = actions;

export function authSuccess(obj) {
	const { pwd, ...data} = obj;
	return {type: AUTH_SUCCESS, payload: data}
}
function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

export function loadData(userinfo) {
	return {type: LOAD_DATA_SUCCESS, payload: userinfo}
}

export function logout() {
	return {type: LOGOUT_SUCCESS }
}

export function login({user, pwd}) {
	if (!user||!pwd) {
		return errorMsg('用户名和密码不能为空！')
	}
	return dispatch=>{
		axios.post('/user/login', {user, pwd}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				localStorage.setItem('user', JSON.stringify(res.data.data));
				dispatch(authSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function register(values) {
	const {repeatpwd, ...data} = values
	if (data.pwd !== repeatpwd) {
		return errorMsg('密码和确认密码不同！')
	}
	return dispatch=>{
		axios.post('/user/register', {...data}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}