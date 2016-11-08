import React, {Component} from 'react';

class XGraphic extends Component{
	constructor(props){
		super(props);

		this.state = {
			number: 0,
			width: 50
		}
	}

	componentDidMount(){
		this.setState({
			number: Math.ceil( Math.random()*15 )
		});
	}

	render(){
		const position = this.state.number*this.state.width;
		const style={
			backgroundImage: `url(images/x/${this.state.number}.png)`
		}

		return(
			<div className="x-graphic">
				<span style={style}></span>
			</div>
		)
	}
}

export default XGraphic;
