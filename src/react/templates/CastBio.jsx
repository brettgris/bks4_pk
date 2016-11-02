import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XGraphic from '../components/x/XGraphic.jsx';

export default class CastBio extends Component {
	handleClick(n){
		var c = this.props.current+n;
		if (c<0) c = this.props.data.length-1;
		if (c>(this.props.data.length-1)) c = 0;

		var direction = (n>0) ? "forward" : "backward";

		this.props.changeItem(c, direction);
	}

	render(){
		const bio = this.props.data[this.props.current];
		if (!bio) return null;

		return(
			<div className={"main "+this.props.direction}>
				{ this.handleVisible() }
				<div className="col-sm-8 col-sm-offset-2">
					{ this.createBio(bio) }
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
						<img src="images/menu/cast.png" />
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
				<div className="menu-container">
					<div className="graphic">
						<XGraphic />
						<XGraphic />
						<XGraphic />
					</div>
					<div className="name">
						<h2 dangerouslySetInnerHTML={{__html: data.name}}></h2>
						<h5 dangerouslySetInnerHTML={{__html: data.role}}></h5>
					</div>
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

	createBio(bio){
		//return null;
		return (
			<ReactCSSTransitionGroup transitionName="slider" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<div className="slide" key={bio.name}>
					<div className="copy">
						{ this.addImage(bio) }
						<div className="title">
							<a className="previous" onClick={()=>this.handleClick(-1)}>
								<i className="fa fa-long-arrow-left"></i>
							</a>
							<div className="graphic right">
								<XGraphic />
								<XGraphic />
								<XGraphic />
							</div>
							<div className="name">
								<h2 className="uppercase center" dangerouslySetInnerHTML={{ __html:bio.name}}></h2>
								<h4 className="role center uppercase italic" dangerouslySetInnerHTML={{ __html:bio.role}}></h4>
							</div>
							<div className="graphic left">
								<XGraphic />
								<XGraphic />
								<XGraphic />
							</div>
							<a className="next" onClick={()=>this.handleClick(1)}>
								<i className="fa fa-long-arrow-right"></i>
							</a>
						</div>
						<div className="columns">
							{ this.createParagraphs(bio) }
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	createParagraphs(bio){
		return bio.desc.map(function(paragraph,key){
			return (
				<p className="desc justify" key={"paragraph"+key} dangerouslySetInnerHTML={{ __html:paragraph }}></p>
			)
		}.bind(this));
	}

	addImage(bio){
		if (bio.image) {
			var style = {
				"backgroundImage": `url(${bio.image})`
			}

			return (
				<div className="image">
					<div className="img" style={style}></div>
				</div>
			);
		}
	}
};
