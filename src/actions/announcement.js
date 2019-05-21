import axios from 'axios';
import actions from '../constants/actions';
import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')

const {
	GET_ANNOUNCEMENTLIST_SUCCESS,
	ADD_ANNOUNCEMENT_SUCCESS,
	DEL_ANNOUNCEMENT_SUCCESS,
	UPDATE_ANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTBYUSER_SUCCESS,
	GET_ONEANNOUNCEMENT_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 公告信息
export function getAnnouncementList() {
	return async(dispatch)=>{
		await axios.get('/announcement/getAnnouncementList').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ANNOUNCEMENTLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getOneAnnouncement(id) {
	return async(dispatch)=>{
		await axios.get('/announcement/getOneAnnouncement', {params: {_id: id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ONEANNOUNCEMENT_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addAnnouncement(values) {
	return async(dispatch)=>{
		await axios.post('/announcement/addAnnouncement', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_ANNOUNCEMENT_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateAnnouncement(values) {
	return async(dispatch)=>{
		await axios.post('/announcement/updateAnnouncement', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_ANNOUNCEMENT_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteAnnouncement(id) {
	return async(dispatch)=>{
		await axios.post('/announcement/deleteAnnouncement', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_ANNOUNCEMENT_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getAnnouncementByUser(user_id) {
	return async(dispatch)=>{
		await axios.get('/announcement/getAnnouncementByUser', {params: {user_id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ANNOUNCEMENTBYUSER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}