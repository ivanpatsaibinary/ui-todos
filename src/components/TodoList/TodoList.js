import React, { Component } from 'react';
import Todo from '../Todo/Todo';
import { observer, inject } from 'mobx-react';

@inject((allStores) => ({
	TodoStore: allStores.TodoStore
}))

@observer
class TodoList extends Component {
	constructor (props) {
		super(props);
		this.renderTodos = this.renderTodos.bind(this);
	}

	componentWillMount () {
		this.props.TodoStore.fetchTodos();
	}

	renderTodos () {
		const { todos } = this.props.TodoStore;
		return todos.map((item, index) => {
			return <Todo key={ index } data={ item } />;
		});
	}

	render () {
		console.log(this.props);
		return (
			<div className='todo-list-container'>
				{ this.renderTodos() }
			</div>
		);
	}
}

export default TodoList;