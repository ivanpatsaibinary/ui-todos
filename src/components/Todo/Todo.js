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
import { inject, observer } from 'mobx-react';

@inject((allStores) => ({
	todos: allStores.TodoStore.todos,
	deleteTodo: allStores.TodoStore.deleteTodo,
	updateTodo: allStores.TodoStore.updateTodo,
	setActiveTodoId: allStores.TodoStore.setActiveTodoId,
	btnDisabled: allStores.TodoStore.btnDisabled,
	activeTodoId: allStores.TodoStore.activeTodoId,
	activeHistoryId: allStores.TodoHistoryStore.activeHistoryId,
	setActiveHistoryId: allStores.TodoHistoryStore.setActiveHistoryId
}))

@observer
class Todo extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showEditForm: false,
			inputValue: '',
			checkboxValue: ''
		};
		this.renderTodo = this.renderTodo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount () {
		const { completed, name } = this.props.data;
		this.setState({
			checkboxValue: completed,
			inputValue: name
		});
	}

	handleSubmit (e) {
		const { updateTodo, data: { id, completed } } = this.props;
		const { inputValue } = this.state;
		if (e) e.preventDefault();
		updateTodo(id, inputValue, completed);
		this.setState({ showEditForm: false });
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.activeHistoryId !== this.props.activeHistoryId) {
			console.log('next props', nextProps);
			this.setState({ showEditForm: false });
		}
		// if (nextProps.activeTodoId !== this.props.activeTodoId) {
		// 	this.props.setActiveHistoryId('');
		// }
	}

	renderTodo () {
		const { inputValue, showEditForm, checkboxValue } = this.state;
		const { data: { name, id }, deleteTodo, activeTodoId, setActiveTodoId, setActiveHistoryId, activeHistoryId, btnDisabled } = this.props;
		if (showEditForm && id === activeTodoId) {
			return (
				<form onSubmit={ this.handleSubmit.bind(this) }>
					<TextField
						floatingLabelText='Edit your todo'
						type='text'
						fullWidth={ true }
						value={ inputValue }
						onChange={ (e) => {
							this.setState({ inputValue: e.target.value });
						} }
					/>
				</form>);
		} else {
			return (
				[
					<div key='latest-data' className='latest-data'>
						<Checkbox
							checked={ checkboxValue } onCheck={ (e) => {
							console.log(e.target.checked);
							const { todos } = this.props;
							const foundObj = todos.find((item) => {
								return item.id === id;
							});
							this.setState({
								checkboxValue: e.target.checked,
								inputValue: foundObj.name
							}, () => {
								this.handleSubmit();
							});
						} }
						/>
						<div className='label-text'>
							<p
								onDoubleClick={ () => {
									setActiveHistoryId('');
									this.setState({ showEditForm: true }, () => {
										setActiveTodoId(id);
									});
									console.log(activeTodoId, activeHistoryId, id);
								} }
							>{ name }</p>
							<p
								onClick={ () => {
									if (activeHistoryId === id) {
										setActiveHistoryId('');
									} else {
										setActiveHistoryId(id);
									}
								} }
							>history</p>
							<div className='delete-icon-container'>
								<IconButton
									onClick={ () => {
										setActiveTodoId(id);
										deleteTodo(id);
									} }
									disabled={ btnDisabled && id === activeTodoId }
								>
									<Delete color='#FAFAFA' />
								</IconButton>
							</div>
						</div>
					</div>,
					(activeHistoryId === id) && <TodoHistoryList key='todo-history' todoId={ id } />
				]
			);
		}
	}

	render () {

		return (
			<div className='item'>
				{ this.renderTodo() }
			</div>
		);
	}
}

export default Todo;