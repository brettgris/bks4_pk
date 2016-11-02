import { combineReducers } from 'redux';
import DataReducer from './DataReducer.jsx';
import SectionReducer from './SectionReducer.jsx';
import VideoReducer from './VideoReducer.jsx';

const rootReducer = combineReducers({
	data: DataReducer,
	section: SectionReducer,
	video: VideoReducer
});

export default rootReducer;
