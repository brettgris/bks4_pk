import React, {Component} from 'react';

import XGraphic from '../components/x/XGraphic.jsx';

export default class Videos extends Component {
	handleClick(n){
		var c = this.props.current+n;
		if (c<0) c = this.props.data.length-1;
		if (c>(this.props.data.length-1)) c = 0;

		var direction = (n>0) ? "forward" : "backward";

		console.log(n);
		this.props.changeItem(c, direction);
	}

	render(){
		return(
			<div className="main">
				{ this.handleVisible() }
				<div className="player">
				</div>
				<div className="arrows col-sm-8 col-sm-offset-2">
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

	handleVisible(){
		if (this.props.data.length<2) return null;

		if ( this.props.thumbs ){
			return (
				<div className="thumbs">
					<ul onClick={()=>this.props.handleThumbs(false)}>
						{ this.createThumbItems() }
					</ul>
				</div>
			)
		} else {
			return (
				<div className="menu">
					<div className="menu-title">
						<img src="images/menu/videos.png" />
					</div>
					<ul>
						{ this.createMenuItems() }
					</ul>
				</div>
			)
		}
	}

	createThumbItems(){
		return this.props.data.map( (data,i)=>{
			return (
				<li className={(this.props.current===i)?"selected":""}></li>
			);
		});
	}

	createMenuItems(){
		return this.props.data.map( (data,i)=>{
			const style = {
				backgroundImage: `url(${data.image})`
			}
			return (
				<li style={style} onClick={()=>this.props.changeItem(i)}>
					<div className="menu-container">
						<div className="graphic">
							<XGraphic />
							<XGraphic />
						</div>
						<h3>{data.name}</h3>
						<div className="graphic">
							<XGraphic />
							<XGraphic />
						</div>
					</div>
				</li>
			);
		});
	}
};
