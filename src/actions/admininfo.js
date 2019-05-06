import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_OWNERINFO_SUCCESS,
	DEL_OWNER_SUCCESS,
	GET_OWNERNAME_SUCCESS,
	GET_OWNERNUM_SUCCESS,
	GET_ADMINNUM_SUCCESS,
	ERROR_MSG,
} = actions;

function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

export function getOwnerInfoList() {
	return async(dispatch)=>{
		await axios.get('/user/list?type=user').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_OWNERINFO_SUCCESS,
					data: res.data.data
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteOwner(_id) {
	return async(dispatch)=>{
		await axios.post('/user/deleteOwner', {_id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_OWNER_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getOwnerName() {
	return async(dispatch)=>{
		await axios.get('/user/getOwnerName?type=user').then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_OWNERNAME_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				})
			}
		})
	}
}

export function getOwnerNum() {
	return async(dispatch)=>{
		await axios.get('/user/getOwnerNum').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_OWNERNUM_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getAdminNum() {
	return async(dispatch)=>{
		await axios.get('/user/getAdminNum').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ADMINNUM_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}