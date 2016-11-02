import React, {Component} from 'react';

class SideMenu extends Component {
	createItems(){
		if (!this.props.data.length) return null;
		
		return this.props.data.map(function(item,key){
			var selected = (this.props.current==key) ? "selected" : "";
			return (
				<a key={item.name} className={selected} onClick={ ()=>this.props.changeItem(key) }>
					<span dangerouslySetInnerHTML={{__html:item.name}}></span>
				</a>
			)
		}.bind(this));
	}

	render(){
		return (
			<div className="sidemenu right-column">
				<div className="list uppercase">
					{ this.createItems() }
				</div>
			</div>
		);
	}
};

export default SideMenu;
