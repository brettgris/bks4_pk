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
		let touch = (Modernizr.touchevents) ? " touch" : "";

		return(

			<div className={"main "+this.props.direction}>
				{ this.handleVisible() }
				<div className={"slides"+touch}>
					{ this.createSlide(bio) }
				</div>
			</div>
		)
	}

	handleVisible(){
		if (this.props.data.length<2) return null;

		if ( this.props.thumbs ){
			return (
				<div className="thumbs hidden-xs">
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
						<div className="graphic hidden-xs hidden-sm">
							<XGraphic />
							<XGraphic />
						</div>
						<h2 dangerouslySetInnerHTML={{__html: data.name}}></h2>
						<div className="graphic hidden-xs hidden-sm">
							<XGraphic />
							<XGraphic />
						</div>
					</div>
				</li>
			)
		});
	}

	createSlide(bio){


		return (

				<div className="slide full" key={bio.name}>
					<div className="copy">
						<div className="title">
							<a className="previous" onClick={()=>this.handleClick(-1)}>
								<i className="fa fa-long-arrow-left"></i>
							</a>
							<div className="name">
								<div>
									<img src={"images/characters/name/"+bio.safename+".png"} className="img img-responsive"/>
									<img src={"images/characters/quote/"+bio.safename+".png"} className="img img-responsive"/>
								</div>
							</div>
							<a className="next" onClick={()=>this.handleClick(1)}>
								<i className="fa fa-long-arrow-right"></i>
							</a>
						</div>
					</div>
				</div>

		)
	}
};
