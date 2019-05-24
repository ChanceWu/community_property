import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_COMMUNITYLIST_SUCCESS,
	ADD_COMMUNITY_SUCCESS,
	DEL_COMMUNITY_SUCCESS,
	UPDATE_COMMUNITY_SUCCESS,
	GET_COMMUNITYNAME_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 小区信息
export function getCommunityList(value = '') {
	return async(dispatch)=>{
		await axios.get('/community/getCommunityList', {params: {value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_COMMUNITYLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addCommunity(values) {
	return async(dispatch)=>{
		await axios.post('/community/addCommunity', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_COMMUNITY_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateCommunity(values) {
	return async(dispatch)=>{
		await axios.post('/community/updateCommunity', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_COMMUNITY_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteCommunity(id) {
	return async(dispatch)=>{
		await axios.post('/community/deleteCommunity', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_COMMUNITY_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getCommunityName() {
	return async(dispatch)=>{
		await axios.get('/community/getCommunityName').then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_COMMUNITYNAME_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				})
			}
		})
	}
}