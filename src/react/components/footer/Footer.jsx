import React, {Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component {
	createSocialItems(){
		return this.props.footer.social.map( function(social,key){
			return (
				<a key={"social"+key} target="_blank" className={social.name} href={social.link}>
					<i className={"fa "+social.class}></i>
				</a>
			)
		}.bind(this));
	}

	render(){
		if (!this.props.footer) return <footer className="footer"></footer>;

		return (
			<footer className="footer">
				<div className="copyright">
					<p>{this.props.footer.copyright}</p>
				</div>
				<div className="social">
					{this.createSocialItems()}
				</div>
			</footer>
		)
	}
}

function mapStateToProps(state) {
	return {
		footer: (state.data) ? state.data['footer'] : null
	};
}

export default connect(mapStateToProps)(Footer);
