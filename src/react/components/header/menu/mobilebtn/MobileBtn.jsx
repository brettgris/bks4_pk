import React from 'react';

const MobileBtn = (props) => {
	return (
		<a className="mobilebtn" onClick={props.handleMobileMenu}>
			<div>
				<span></span>
				<span></span>
				<span></span>
				</div>
		</a>
	);
}

export default MobileBtn;
