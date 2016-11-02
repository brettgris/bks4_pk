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
			number: Math.floor( Math.random()*60 )
		});
	}

	render(){
		const position = this.state.number*this.state.width;
		const style={
			backgroundPosition: `-${position}px 0`
		}

		return(
			<div className="x-graphic">
				<span style={style}></span>
			</div>
		)
	}
}

export default XGraphic;
