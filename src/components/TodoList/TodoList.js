import React, { Component } from 'react';
import Todo from '../Todo/Todo';
import { observer, inject } from 'mobx-react';
import { FloatingActionButton } from 'material-ui';
import Loop from 'material-ui/svg-icons/av/loop';

@inject((allStores) => ({
	TodoStore: allStores.TodoStore,
	setRange: allStores.TodoStore.setRange
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
		const { setRange } = this.props;
		return (
			<div className='todo-list-container'>
				{ this.renderTodos() }
				<FloatingActionButton
					onClick={ () => {
						setRange();
					} }
				>
					<Loop />
				</FloatingActionButton>
			</div>
		);
	}
}

export default TodoList;