import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';

const Header = (props) => {
	//todo rename isActive, it is not related to form state
	const { handleClick, isActive } = props;
	return (
		<AppBar
			iconElementRight={ <IconButton
				onClick={ handleClick }
			>
				{ isActive ? <Clear /> : <Add /> }
			</IconButton> }
			showMenuIconButton={ false }
		/>
	);
};

export default Header;
