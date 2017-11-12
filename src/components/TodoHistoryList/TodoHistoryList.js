import React, { Component } from 'react';
import TodoHistory from '../TodoHistory/TodoHistory';
import Divider from 'material-ui/Divider';

class TodoHistoryList extends Component {
	render () {
		const { showHistory } = this.props;
		return (
			<div className={ `history ${showHistory ? '' : 'hide-history'}` }>
				<TodoHistory />
				<Divider />
				<p>History 1</p>
				<Divider />
				<p>History 2</p>
				<Divider />
				<p>History 3</p>
			</div>
		);
	}
}

export default TodoHistoryList;