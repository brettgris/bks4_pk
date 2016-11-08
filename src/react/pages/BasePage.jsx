import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, setSection, changeVideo} from '../actions/actions.jsx';

import Header from '../components/header/Header.jsx';
import MobileMenu from '../components/mobilemenu/MobileMenu.jsx';
import Footer from '../components/footer/Footer.jsx';
import VideoPlayer from '../components/videoplayer/VideoPlayer.jsx';

import Templates from '../templates/Templates.jsx';

class BasePage extends Component {
	constructor(props){
		super(props);

		this.state = {
			direction: "forward",
			current: 0,
			mobilemenu: false,
			thumbs: true
		}

		this.class = null;
		this.changeItem = this.changeItem.bind(this);
		this.handleCompleteVideo = this.handleCompleteVideo.bind(this);
		this.handleMobileMenu = this.handleMobileMenu.bind(this);
		this.handleThumbsVisible = this.handleThumbsVisible.bind(this);

		this.props.fetchData();
	}

	componentWillUpdate(n){
		if( n.section.class != this.class ){
			this.class = n.section.class;
			this.setState({
				current: 0,
				thumbs: true
			});
		}
	}

	changeItem(n,direction,thumbs=true){
		direction = (direction) ? direction : "forward";
		if (thumbs) this.handleThumbsVisible(true);

		if (this.props.section.content[n]&&(this.props.section.content[n]['video']||this.props.section.content[n]['background'])){
			this.props.changeVideo(this.props.section.content[n]);
		}

		this.setState({
			current: n,
			direction: direction
		});
	}

	handleCompleteVideo(){
		if (this.props.section.onComplete){
			if(this.props.section.onComplete=="NEXT_ITEM"){
				var c = this.state.current+1;
				if (c>(this.props.section.content.length-1)) c = 0;

				this.changeItem(c,"forward",false);
			}
			//this.props.setSection( this.props.sections[this.props.section.onComplete] )
		}
	}

	addMobileMenu(){
		if (this.state.mobilemenu) {
			return (
				<MobileMenu handleMobileMenu={this.handleMobileMenu} />
			)
		} else return null;
	}

	handleMobileMenu(){
		this.setState({
			mobilemenu: !this.state.mobilemenu
		});
	}

	handleThumbsVisible(b){
		this.setState({
			thumbs: b
		});
	}

	render(){
		if (!this.props.section) return null;

		var Main = (Templates[this.props.section.maincontent]&&this.props.section.content[this.state.current]) ? Templates[this.props.section.maincontent]: "div";

		return (
			<div className={"wrapper "+this.props.section.class}>
				<Header handleMobileMenu={this.handleMobileMenu}/>

				<div className="main-column">
					{ this.addMobileMenu() }
					<Main data={this.props.section.content} current={this.state.current} direction={this.state.direction} changeItem={this.changeItem} onComplete={this.loadSection} handleThumbs={this.handleThumbsVisible} thumbs={this.state.thumbs} />
					<VideoPlayer loop={this.props.section.loop} onComplete={this.handleCompleteVideo} />
				</div>

				<Footer />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		section: (state.section) ? state.section : null,
		sections: (state.data) ? state.data['sections'] : null
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchData: fetchData,
		setSection: setSection,
		changeVideo: changeVideo
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);
