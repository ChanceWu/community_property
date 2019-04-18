import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_OWNERINFO_SUCCESS,
	ERROR_MSG,
} = actions;

function getOwnerInfoListSuccess(data) {
	return {type: GET_OWNERINFO_SUCCESS, data: data}
}
function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

export function getOwnerInfoList() {
	return dispatch=>{
		axios.get('/user/list?type=user').then(res=>{
			if (res.status==200&&res.data.code===0) {
				console.log(res)
				dispatch(getOwnerInfoListSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}