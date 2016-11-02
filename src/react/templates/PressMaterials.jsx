import React, {Component} from 'react';

export default class PressMaterials extends Component {
	render(){
		return(
			<div className="main col-xs-12 col-sm-12 col-lg-9 col-lg-offset-1">
				<ul>
					{ this.createSections() }
				</ul>
			</div>
		)
	}

	createSections(){
		return this.props.data.map( (data,i)=>{
			return (
				<li className="section">
					<div className="content">
						<div className="press-title">
							<h2><i className={"fa "+data.icon}></i></h2>
							<h1 dangerouslySetInnerHTML={{__html:data.name}}></h1>
						</div>
						<div className="press-links">
							{ this.createLinks(data.links,data.class) }
						</div>
					</div>
				</li>
			)
		});
	}

	createLinks(data,classname){
		return data.map( (link)=>{
			return (
				<a className={classname} href={link.link} target="_blank" dangerouslySetInnerHTML={{__html:link.name}}></a>
			)
		});
	}

};
