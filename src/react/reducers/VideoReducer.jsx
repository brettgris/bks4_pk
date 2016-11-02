import {FETCH_DATA, SET_SECTION, CHANGE_VIDEO} from '../actions/actions.jsx';

export default function(state = null,action){
	switch(action.type){
		case FETCH_DATA:
			return {
				video: action.payload.sections[2].video,
				background: action.payload.sections[2].background
			};
		case SET_SECTION:
			return {
				video: action.payload.video,
				background: action.payload.background
			};
		case CHANGE_VIDEO:
			return action.payload;
		default:
			return state;
	}
}
