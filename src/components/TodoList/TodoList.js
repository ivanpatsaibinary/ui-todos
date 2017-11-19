import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TodoContainer from '../../containers/TodoContainer/TodoContainer';

@inject((allStores) => ({
	activeTodoId: allStores.TodoStore.activeTodoId,
	todos: allStores.TodoStore.todos
}))

@observer
class TodoList extends Component {

	renderTodos = () => {
		const { todos, activeTodoId } = this.props;
		return todos.map((item, index) => {
			return <TodoContainer
				key={ index }
				data={ item }
				isActive={ item.id === activeTodoId }
			/>;
		});
	};

	render () {
		return (
			<div className='todo-list-container'>
				{ this.renderTodos() }
			</div>
		);
	}
}

export default TodoList;
