import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import './todoContainer.css';
import TodoHistoryList from '../../components/TodoHistoryList/TodoHistoryList';
import { Divider } from 'material-ui';
import EditFrom from '../../components/EditForm';
import Todo from '../../components/Todo/Todo';

@inject((allStores) => ({
	updateTodo: allStores.TodoStore.updateTodo,
	setActiveTodoId: allStores.TodoStore.setActiveTodoId
}))

@observer
class TodoContainer extends Component {
	@observable btnEnabled = true;
	@observable showEditForm = false;
	@observable showHistory = false;
	@observable completed;

	constructor (props) {
		super(props);
		this.completed = this.props.data.completed;
	}

	onUpdateTodo = (inputValue) => {
		const { updateTodo, data: { id, name } } = this.props;
		const updatedName = inputValue ? inputValue : name;
		updateTodo(id, updatedName, this.completed);
		this.showEditForm = false;
	};

	onToggleCompleted = () => {
		this.completed = !this.completed;
	};

	changeHistoryState = () => {
		this.showHistory = false;
	};

	onTodoEdit = () => {
		const { setActiveTodoId, data: { id } } = this.props;
		setActiveTodoId(id);
		this.showEditForm = true;
		this.showHistory = false;
	};

	onShowHistoryClick = () => {
		const { setActiveTodoId, isActive, data: { id } } = this.props;
		const historyState = isActive ? !this.showHistory : true;
		setActiveTodoId(id);
		this.showEditForm = false;
		this.showHistory = historyState;
	};

	renderTodo = () => {
		let { data: { name, id }, isActive } = this.props;
		if (this.showEditForm && isActive) {
			return (
				<EditFrom onSubmit={ this.onUpdateTodo } defaultValue={ name } />
			);
		} else {
			return (
				[
					<Todo
						name={ name }
						completed={ this.completed }
						id={ id }
						//todo avoid data transition
						isActive={ isActive }
						handleDoubleClick={ this.onTodoEdit }
						handleClick={ this.onShowHistoryClick }
						handleShowHistory={ this.changeHistoryState }
						handleSubmit={ this.onUpdateTodo }
						handleCheckboxChange={ this.onToggleCompleted }
					/>,
					(this.showHistory && isActive) ?
						<TodoHistoryList key='todo-history' todoId={ id } /> :
						<Divider key={ `divider-${id}` } />
				]
			);
		}
	};

	render () {
		return (
			<div className='item'>
				{ this.renderTodo() }
			</div>
		);
	}
}

export default TodoContainer;
