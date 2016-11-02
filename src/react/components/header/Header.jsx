import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setSection} from '../../actions/actions.jsx';

import Menu from './menu/Menu.jsx';
import MobileBtn from './menu/mobilebtn/MobileBtn.jsx';

class Header extends Component {
	handleClick(obj){
		this.props.setSection( obj );
	}

	render(){
		return (
			<div className="header">
				<div className="titleart">
					<a onClick={ ()=>this.handleClick(this.props.sections[0]) }></a>
				</div>
				<MobileBtn handleMobileMenu={this.props.handleMobileMenu} />
				<Menu />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		sections: (state.data) ? state.data['sections'] : null
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		setSection: setSection
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
