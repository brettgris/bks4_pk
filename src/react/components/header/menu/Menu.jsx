import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setSection} from '../../../actions/actions.jsx';

class Menu extends Component{
	handleClick(obj){
		this.props.setSection(obj);
	}

	createMenuItems(){
		return this.props.sections.map( function(item,key){
			var selected = (this.props.current==item.link) ? "selected" : "";
			if (item.menu){
				if (!item.external){
					return (
						<a key={"menu"+key} className={selected} onClick={ ()=>this.handleClick(item) }>
							<span>{item.name}</span>
						</a>
					)
				} else {
					return(
						<a key={"menu"+key} href={item.link} target="_blank" className="highlight">
							<span>{item.name}</span>
						</a>
					)
				}
			}
		}.bind(this));
	}

	render(){
		if (!this.props.sections) return null;

		var hidemenu = (this.props.hidemenu) ? "hidemenu" : "";

		return(
			<div className="menu">
				<div className={"list visible-lg visible-md uppercase "+hidemenu}>
					{this.createMenuItems()}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		hidemenu: (state.video['hidemenu']) ? state.video['hidemenu'] : false,
		current: (state.section) ? state.section['class'] : null,
		sections: (state.data) ? state.data['sections'] : null
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		setSection: setSection
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
