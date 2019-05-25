import axios from 'axios';
import actions from '../constants/actions';
import io from 'socket.io-client'
const socket = io('ws://192.168.31.120:9090')

const {
	GET_ANNOUNCEMENTLIST_SUCCESS,
	ADD_ANNOUNCEMENT_SUCCESS,
	DEL_ANNOUNCEMENT_SUCCESS,
	UPDATE_ANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTBYUSER_SUCCESS,
	GET_ONEANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTLISTBYSTATUS_SUCCESS,

	GET_ANNOUNCEMENTREADLIST_SUCCESS,
	GET_READANNOUNCEMENT_SUCCESS,
	GET_RECVANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTNUM_SUCCESS,
	GET_ANNOUNCEMENTTOPIC_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 公告信息
export function getAnnouncementList(value='') {
	return async(dispatch)=>{
		await axios.get('/announcement/getAnnouncementList', {params: {value}}).then(res=>{
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

export function getAnnouncementListByStatus(status, value='') {
	return async(dispatch)=>{
		await axios.get('/announcement/getAnnouncementListByStatus', {params: {status, value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ANNOUNCEMENTLISTBYSTATUS_SUCCESS,
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

// 公告是否已读
// 获取当前业主未读公告数量
export function getAnnouncementReadList(user_id) {
	return async(dispatch)=>{
		await axios.get(`/announcement/getAnnouncement_read?user_id=${user_id}`).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ANNOUNCEMENTREADLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

// 读公告，将未读转化为已读
export function readAnnouncement(user_id) {
	return async(dispatch)=>{
		await axios.post('/announcement/readAnnouncement', {user_id}).then(res=>{
			if (res.status==200&&res.data.code==0) {
				dispatch({
					type: GET_READANNOUNCEMENT_SUCCESS,
					num: res.data.num,
				});
			}
		})
	}
}

export function sendAnnouncement(data) {
	return (dispatch)=>{
		socket.emit('sendAnnouncement', data)
	}
}

export function recvAnnouncement() {
	return async(dispatch)=>{
		await socket.on('recvAnnouncement', function(data) {
			console.log(data)
			if (data.code===0) {
				dispatch({
					type: GET_RECVANNOUNCEMENT_SUCCESS,
					num: 1,
					data: data.data,
				})
			}
		})
	}
}

export function getAnnouncementNum() {
	return async(dispatch)=>{
		await axios.get('/announcement/getAnnouncementNum').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ANNOUNCEMENTNUM_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getAnnouncementTopic() {
	return async(dispatch)=>{
		await axios.get('/announcement/getAnnouncementTopic').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ANNOUNCEMENTTOPIC_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
