import React from 'react';
import { IconButton } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';

const DeleteButton = (props) => {
	const { isActive, handleClick, isButtonEnabled } = props;
	return (
		<div className='delete-icon-container'>
			<IconButton
				onClick={ handleClick }
				disabled={ !isButtonEnabled && isActive }
			>
				<Delete color='#FAFAFA' />
			</IconButton>
		</div>
	);
};

export default DeleteButton;
