import {FETCH_DATA,SET_SECTION} from '../actions/actions.jsx';

export default function(state = null,action){
	switch(action.type){
		case FETCH_DATA:
			return action.payload.sections[0];
		case SET_SECTION:
			return action.payload;
		default:
			return state;
	}
}
