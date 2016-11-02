import superagent from 'superagent';

export const FETCH_DATA = 'FETCH_DATA';
export const SET_SECTION = 'SET_SECTION';
export const CHANGE_VIDEO = 'CHANGE_VIDEO';

//GET THEM
export function fetchData(dispatch){
	const url = "data/data.json";

	return dispatch => {
		const request = superagent.get(url).end(function(err,res){
			if (res) {
				//Dispatch Response to Reducer
				dispatch({
					type: FETCH_DATA,
					payload: res.body
				});
			}
		});
	}
}

export function setSection(obj, dispatch){
	return dispatch => {
		dispatch({
			type: SET_SECTION,
			payload: (obj) ? obj : null
		});
	}
}

export function changeVideo(obj, dispatch){
	return dispatch => {
		dispatch({
			type: CHANGE_VIDEO,
			payload: (obj) ? obj : null
		});
	}
}
