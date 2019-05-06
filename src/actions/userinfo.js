import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_PERSONINFO_SUCCESS,
	UPDATE_PERSONINFO_SUCCESS,

	GET_FAMILYMEMBER_SUCCESS,
	ADD_FAMILYMEMBER_SUCCESS,
	DEL_FAMILYMEMBER_SUCCESS,
	UPDATE_FAMILYMEMBER_SUCCESS,
	GET_FAMILYMEMBERNUM_SUCCESS,

	ERROR_MSG,
} = actions;

function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 业主信息
export function getPersonInfo(id) {
	return async(dispatch)=>{
		await axios.get('/user/list', {params: {_id: id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				console.log(res)
				dispatch({
					type: GET_PERSONINFO_SUCCESS,
					data: res.data.data
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updatePersonInfo(values) {
	return async(dispatch)=>{
		await axios.post('/user/updatePersonInfo', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_PERSONINFO_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}


// 家庭成员信息
export function getFamilyMember(userid) {
	return async(dispatch)=>{
		await axios.get(`/user_familymember/getFamilyMember?user_id=${userid}`).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_FAMILYMEMBER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addFamilyMember(values) {
	return async(dispatch)=>{
		await axios.post('/user_familymember/addFamilyMember', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_FAMILYMEMBER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteFamilyMember(_id) {
	console.log(_id)
	return async(dispatch)=>{
		await axios.post('/user_familymember/deleteFamilyMember', {_id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_FAMILYMEMBER_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateFamilyMember(values) {
	return async(dispatch)=>{
		await axios.post('/user_familymember/updateFamilyMember', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_FAMILYMEMBER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getFamilyMemberNum(userid) {
	return async(dispatch)=>{
		await axios.get(`/user_familymember/getFamilyMemberNum?user_id=${userid}`).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_FAMILYMEMBERNUM_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
