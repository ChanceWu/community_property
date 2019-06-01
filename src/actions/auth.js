import axios from 'axios';
import actions from '../constants/actions';

const {
	LOAD_DATA_SUCCESS,
	AUTH_SUCCESS,
	ERROR_MSG,
	LOGOUT_SUCCESS,

	ADD_OWNER_SUCCESS,
} = actions;

export function authSuccess(obj, msg) {
	const { pwd, ...data} = obj;
	return {type: AUTH_SUCCESS, payload: data, msg: msg}
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

export function login({user, pwd, type}) {
	if (!user||!pwd) {
		return errorMsg('用户名和密码不能为空！')
	}
	return async(dispatch)=>{
		await axios.post('/user/login', {user, pwd, type}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				localStorage.setItem('user', JSON.stringify(res.data.data));
				dispatch(authSuccess(res.data.data, res.data.msg));
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
	return async(dispatch)=>{
		await axios.post('/user/register', {...data}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				localStorage.setItem('user', JSON.stringify(res.data.data));
				dispatch(authSuccess(res.data.data, res.data.msg))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addOwner(values) {
	const {repeatpwd, ...data} = values
	if (data.pwd !== repeatpwd) {
		return errorMsg('密码和确认密码不同！')
	}
	return async(dispatch)=>{
		await axios.post('/user/addOwner', {...data}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: ADD_OWNER_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}