import React, {Component} from 'react';

import XGraphic from '../components/x/XGraphic.jsx';

export default class Videos extends Component {
	constructor(props){
		super(props);

		this.state = {
			width: 640,
			height: 640 * (9/16)
		};

		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount(){
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.handleResize);
	}


	handleClick(n){
		var c = this.props.current+n;
		if (c<0) c = this.props.data.length-1;
		if (c>(this.props.data.length-1)) c = 0;

		var direction = (n>0) ? "forward" : "backward";

		this.props.changeItem(c, direction);
	}

	handleResize(){
		let w = this.refs.player.offsetWidth;
		let h = this.refs.player.offsetHeight;

		let r = w/h;
		const vr = 16/9;

		if (r<vr){
			this.setState({
				width: w,
				height: w / vr
			});
		} else {
			this.setState({
				height: h,
				width: h * vr
			});
		}
	}

	render(){
		return(
			<div className="main">
				{ this.handleVisible() }
				<div className="player" ref="player">
					{ this.renderCurrentEmbed() }
				</div>
				<div className="arrows full">
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

	renderCurrentEmbed(){
		const path = this.props.data[this.props.current].path;
		if (path){
			let style = {
				width: this.state.width,
				height: this.state.height
			}
			return (
				<div style={style}>
					<iframe width="100%" height="100%" src={path} frameBorder="0" scrolling="no"></iframe>
				</div>
			);
		}
	}

	handleVisible(){
		if (this.props.data.length<2) return null;

		if ( this.props.thumbs ){
			return (
				<div className="thumbs hidden-xs">
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
						<div className="graphic hidden-xs">
							<XGraphic />
							<XGraphic />
						</div>
						<h3>{data.name}</h3>
						<div className="graphic hidden-xs">
							<XGraphic />
							<XGraphic />
						</div>
					</div>
				</li>
			);
		});
	}
};
