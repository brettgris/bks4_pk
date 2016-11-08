import React, {Component} from 'react';

export default class Synopsis extends Component {
	render(){
		return(
			<div className="main">
				<div className="content">
					<div className="copy">
						<div className="title-art">
							<img src={this.props.data[0].titleart} className="img img-responsive"/>
						</div>
						<div className="key-art visible-xs">
							<img src={this.props.data[0].keyart} className="img img-responsive"/>
						</div>
						<div className="tag-line">
							<img src={this.props.data[0].tagline} className="img img-responsive"/>
						</div>
						{this.createSynopsis()}
					</div>
				</div>
			</div>

		)
	}

	createSynopsis(){
		return this.props.data[0].synopsis.map(function(item,key){
			return (
				<p key={"synopsis"+key} dangerouslySetInnerHTML={{ __html:item}}></p>
			)
		})
	}
};
