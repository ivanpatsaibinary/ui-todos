import React from 'react';
import { FloatingActionButton } from 'material-ui';
import Loop from 'material-ui/svg-icons/av/loop';

const UpdateButton = (props) => {
	return (
		<FloatingActionButton onClick={ props.handleClick }>
			<Loop />
		</FloatingActionButton>
	);
};

export default UpdateButton;

