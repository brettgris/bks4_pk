import {FETCH_DATA} from '../actions/actions.jsx';

export default function(state = null,action){
	switch(action.type){
		case FETCH_DATA:
			return action.payload
		default:
			return state
	}
}
