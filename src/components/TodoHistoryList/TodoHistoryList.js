import React, { Component } from 'react';
import TodoHistory from '../TodoHistory/TodoHistory';
import { observer, inject } from 'mobx-react';

@inject((allStores) => ({
	fetchTodoHistory: allStores.TodoHistoryStore.fetchTodoHistory,
	todoHistory: allStores.TodoHistoryStore.todoHistory
}))

@observer
class TodoHistoryList extends Component {
	//todo handle history fetch
	componentWillMount () {
		const { fetchTodoHistory, todoId } = this.props;
		fetchTodoHistory(todoId);
	}

	renderTodoHistory = () => {
		const { todoHistory } = this.props;
		if (todoHistory.length) {
			return todoHistory.map((item, index) => {
				return <TodoHistory data={ item } key={ index } />;
			});
		} else {
			return <div>No history yet</div>;
		}
	};

	render () {
		return (
			<div className={ `history` }>
				{ this.renderTodoHistory() }
			</div>
		);
	}
}

export default TodoHistoryList;
