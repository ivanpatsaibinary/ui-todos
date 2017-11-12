import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import './todo.css';
import TodoHistoryList from '../TodoHistoryList/TodoHistoryList';

class Todo extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showHistory: false
		};
	}

	render () {
		const { showHistory } = this.state;
		return (
			<div className='item'>
				<div className='latest-data'>
					<Checkbox />
					<div className='label-text'>
						<p
							onClick={ () => {
								this.setState({ showHistory: !showHistory });
							} }
						>Go and buy something</p>
						<div className='delete-icon-container'>
							<IconButton>
								<Delete color='#FAFAFA' />
							</IconButton>
						</div>
					</div>
				</div>
				<TodoHistoryList showHistory={ showHistory } />
			</div>
		);
	}
}

export default Todo;