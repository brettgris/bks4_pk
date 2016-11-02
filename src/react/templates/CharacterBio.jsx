import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XGraphic from '../components/x/XGraphic.jsx';

export default class CharacterBio extends Component {
	handleClick(n){
		let c = this.props.current+n;
		if (c<0) c = this.props.data.length-1;
		if (c>(this.props.data.length-1)) c = 0;

		let direction = (n>0) ? "forward" : "backward";

		this.props.changeItem(c, direction);
	}

	render(){
		const bio = this.props.data[this.props.current];
		if (!bio) return null;

		return(

			<div className={"main "+this.props.direction}>
				{ this.handleVisible() }
				<div className="slides">
					{ this.createSlide(bio) }
				</div>
			</div>
		)
	}

	handleVisible(){
		if (this.props.data.length<2) return null;

		if ( this.props.thumbs ){
			return (
				<div className="thumbs">
					<ul onClick={()=>this.props.handleThumbs(false)}>
						{ this.createThumbsItems() }
					</ul>
				</div>
			)
		} else {
			return (
				<div className="menu">
					<div className="menu-title">
						<img src="images/menu/characters.png" />
					</div>
					<ul>
						{ this.createMenuItems() }
					</ul>
				</div>
			)
		}
	}

	createThumbsItems(){
		return this.props.data.map( (data,i)=>{
			return (
				<li className={(this.props.current===i)?"selected":""}></li>
			);
		});
	}

	createMenuItems(){
		return this.props.data.map( (data,i)=>{
			return (
				<li onClick={()=>this.props.changeItem(i)}>
					<div>
						<div className="graphic">
							<XGraphic />
							<XGraphic />
							<XGraphic />
						</div>
						<h2 dangerouslySetInnerHTML={{__html: data.name}}></h2>
						<div className="graphic">
							<XGraphic />
							<XGraphic />
							<XGraphic />
						</div>
					</div>
				</li>
			)
		});
	}

	// <div className="graphic">
	// 	<XGraphic />
	// 	<XGraphic />
	// 	<XGraphic />
	// </div>
	// <div className="name">
	// 	<h2 className="uppercase center" dangerouslySetInnerHTML={{ __html:bio.name}}></h2>
	// 	<h4 className="actor uppercase center" dangerouslySetInnerHTML={{ __html:bio.actor}}></h4>
	// </div>
	// <div className="graphic">
	// 	<XGraphic />
	// 	<XGraphic />
	// 	<XGraphic />
	// </div>

	//<ReactCSSTransitionGroup transitionName="slider" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
	//</ReactCSSTransitionGroup>

	//col-sm-8 col-sm-offset-2

	createSlide(bio){
		return (

				<div className="slide full" key={bio.name}>
					<div className="copy">
						<div className="title">
							<a className="previous" onClick={()=>this.handleClick(-1)}>
								<i className="fa fa-long-arrow-left"></i>
							</a>
							<div className="name"></div>
							<a className="next" onClick={()=>this.handleClick(1)}>
								<i className="fa fa-long-arrow-right"></i>
							</a>
						</div>
					</div>
				</div>

		)
	}
};
