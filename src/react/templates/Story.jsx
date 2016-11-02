import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Story extends Component {
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	createSlide(){
		if (!this.props.data[this.props.current]) return null;

		var style = {
			backgroundImage: `url(${this.props.data[this.props.current].image})`
		}

		return (
         <div className="slide" key={"slide"+this.props.current} style={style}></div>
      );
	}

	handleClick(n){
		var c = this.props.current+n;
		if (c<0) c = this.props.data.length-1;
		if (c>(this.props.data.length-1)) c = 0;

		var direction = (n>0) ? "forward" : "backward";

		this.props.changeItem(c, direction);
	}

	render(){


		return(
			<div className={"main "+this.props.direction}>
				<ReactCSSTransitionGroup transitionName="slider" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
						{this.createSlide()}
				</ReactCSSTransitionGroup>
				<div className="title">
					<a className="previous" onClick={()=>this.handleClick(-1)}></a>
					<div className="name"></div>
					<a className="next" onClick={()=>this.handleClick(1)}></a>
				</div>
			</div>
		)
	}
};
