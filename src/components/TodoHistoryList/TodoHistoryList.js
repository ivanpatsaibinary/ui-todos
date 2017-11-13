import React, { Component } from 'react';
import TodoHistory from '../TodoHistory/TodoHistory';
import Divider from 'material-ui/Divider';
import { observer, inject } from 'mobx-react';

@inject((allStores) => ({
	fetchTodoHistory: allStores.TodoHistoryStore.fetchTodoHistory,
	todoHistory: allStores.TodoHistoryStore.todoHistory,
}))

@observer
class TodoHistoryList extends Component {

	constructor (props) {
		super(props);
		this.renderTodoHistory = this.renderTodoHistory.bind(this);
	}

	componentWillMount () {
		const { fetchTodoHistory, todoId } = this.props;
		fetchTodoHistory(todoId);
	}

	renderTodoHistory () {
		const { todoHistory, activeHistoryId, todoId } = this.props;
		console.log(todoHistory);
		console.log(activeHistoryId === todoId, activeHistoryId, todoId);
			if (todoHistory.length) {
				return todoHistory.map((item) => {
					return <TodoHistory data={ item } />;
				});
			} else {
				return <div>No history yet</div>;
			}
	}

	render () {
		const { showHistory, todoHistory } = this.props;
		console.log(todoHistory);
		return (
			<div className={ `history` }>
				{ this.renderTodoHistory() }
			</div>
		);
	}
}

export default TodoHistoryList;