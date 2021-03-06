import React, {Component} from 'react';
import {connect} from 'react-redux';
import vide from 'vide';
import $ from 'jquery';

class VideoPlayer extends Component{
	constructor(props){
		super(props);

		this.video = null;
		this.path = null;
		this.loadVideo = this.loadVideo.bind(this);
		this.videoDone = this.videoDone.bind(this);

		this.state = {
			mobile: null
		}
		this.handleResize = this.handleResize.bind(this);
	}

	handleResize(){
		let w = $('.main-column').width();

		if (w<770&&this.state.mobile!==true){
			var v = $('.main-column').data('vide');
			if (v) v.destroy();

			this.setState({
				mobile: true
			});
		} else if (w>770&&this.state.mobile!==false){
			this.setState({
				mobile: false
			});
		}
	}

	componentDidMount(){
		//window.addEventListener("resize",this.handleResize);
		//this.handleResize();
		this.loadVideo();
	}

	componentWillUnmount(){
		//window.removeEventListener("resize",this.handleResize);
	}

	componentDidUpdate(){
		if( this.props.video['video']!=false&&this.props.video['video']!=this.path ) this.loadVideo();
		else {
			if (this.props.video['video']!==this.path){
				this.path = null;
				var v = $('.main-column').data('vide');
				if (v) v.destroy();
			}
		}
	}

	loadVideo(){
		var touchevents = Modernizr.touchevents;

		if (this.props.video.video&&!touchevents) {
			if (this.video) this.video.pause();
		 	this.path = this.props.video.video;

			$('.main-column').vide({
				mp4: `videos/${this.props.video.video}.mp4`
			},{
				autoplay: true,
				muted: false,
				loop: this.props.loop,
				posterType: 'none',
				className: 'videoplayer'
			});

			this.video = $('.main-column').data('vide').getVideoObject();
			if(!this.props.loop) this.video.addEventListener("ended", this.videoDone, false);
		}

		if (touchevents&&this.props.video.video=="trailer") this.videoDone();
	}

	videoDone(){
		this.props.onComplete();
	}

	render(){
		var touchevents = Modernizr.touchevents;

		if (!this.props.video.video||touchevents||this.state.mobile) {
			var style = {
				"backgroundImage": `url(${this.props.video.background})`
			};

			return (
				<div className="background" style={style}></div>
			)
		}

		return null;
	}
}

function mapStateToProps(state) {
	return {
		video: (state.video) ? state.video : null
	};
}

export default connect(mapStateToProps)(VideoPlayer);
