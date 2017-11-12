import React, { Component } from 'react';
import Todo from '../Todo/Todo';
import { observer } from 'mobx-react';
import TodoStore from './../../store/TodoStore';

@observer
class TodoList extends Component {
	render () {
		console.log(this.props.TodoStore);

		return (
			<div className='todo-list-container'>
				<Todo />
			</div>
		);
	}
}

export default TodoList;