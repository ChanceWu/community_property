import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_HOUSEINFO_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 住宅信息
export function getHouseInfo(id) {
	return async(dispatch)=>{
		await axios.get('/house/getHouseInfo', {params: {user_id: id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				console.log(res)
				dispatch({
					type: GET_HOUSEINFO_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
