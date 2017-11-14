import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import { inject, observer } from 'mobx-react';

import './todo.css';
import TodoHistoryList from '../TodoHistoryList/TodoHistoryList';

@inject((allStores) => ({
	todos: allStores.TodoStore.todos,
	deleteTodo: allStores.TodoStore.deleteTodo,
	updateTodo: allStores.TodoStore.updateTodo,
	setActiveTodoId: allStores.TodoStore.setActiveTodoId,
	btnDisabled: allStores.TodoStore.btnDisabled,
	addFormDisabled: allStores.TodoStore.addFormDisabled,
	changeEditFormState: allStores.TodoStore.changeEditFormState,
	changeHistoryState: allStores.TodoStore.changeHistoryState,
	showEditForm: allStores.TodoStore.showEditForm,
	activeTodoId: allStores.TodoStore.activeTodoId,
	showHistory: allStores.TodoStore.showHistory
}))

@observer
class Todo extends Component {
	handleSubmit (e) {
		const { updateTodo, data: { id, completed, name }, changeEditFormState } = this.props;
		if (e) e.preventDefault();
		updateTodo(id, name, completed);
		changeEditFormState(false);
	}

	onToggleCompleted () {
		const todo = this.props.data;
		todo.completed = !todo.completed;
	}

	onRename (newName) {
		const todo = this.props.data;
		todo.name = newName;
	}

	renderTodo () {
		let { data: { name, id, completed }, deleteTodo, activeTodoId, setActiveTodoId, btnDisabled, addFormDisabled, showEditForm, changeEditFormState, showHistory, changeHistoryState } = this.props;
		const isActive = id === activeTodoId;
		if (showEditForm && isActive) {
			return (
				<form onSubmit={ this.handleSubmit.bind(this) }>
					<TextField
						floatingLabelText='Edit your todo'
						type='text'
						fullWidth={ true }
						value={ name }
						disabled={ addFormDisabled && isActive }
						onChange={ e => this.onRename(e.target.value) }
					/>
				</form>);
		} else {
			return (
				[
					<div key='latest-data' className='latest-data'>
						<Checkbox
							checked={ completed } onCheck={ () => {
							this.onToggleCompleted();
							this.handleSubmit();
						} }
						/>
						<div className='label-text'>
							<p
								onDoubleClick={ () => {
									setActiveTodoId(id);
									changeEditFormState();
									changeHistoryState(false);
								} }
							>{ name }</p>
							<p
								onClick={ () => {
									const historyState = isActive ? !showHistory : true;
									setActiveTodoId(id);
									changeEditFormState(false);
									changeHistoryState(historyState);
								} }
							>history</p>
							<div className='delete-icon-container'>
								<IconButton
									onClick={ () => {
										setActiveTodoId(id);
										changeHistoryState(false);
										deleteTodo();
									} }
									disabled={ btnDisabled && isActive }
								>
									<Delete color='#FAFAFA' />
								</IconButton>
							</div>
						</div>
					</div>,
					(showHistory && isActive) && <TodoHistoryList key='todo-history' todoId={ id } />
				]
			);
		}
	}

	render () {
		return (
			<div className='item'>
				{ this.renderTodo.call(this) }
			</div>
		);
	}
}

export default Todo;