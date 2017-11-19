import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import './todo.css';
import DeleteButton from '../DeleteButton';

@inject((allStores) => ({
	deleteTodo: allStores.TodoStore.deleteTodo,
	setActiveTodoId: allStores.TodoStore.setActiveTodoId
}))

@observer
class Todo extends Component {
	@observable btnEnabled = true;

	onDeleteTodo = () => {
		const { setActiveTodoId, handleShowHistory, deleteTodo, id } = this.props;
		setActiveTodoId(id);
		this.btnEnabled = false;
		handleShowHistory();
		deleteTodo().then(() => this.btnEnabled = true);
	};

	handleCheck = () => {
		const { handleCheckboxChange, handleSubmit } = this.props;
		handleCheckboxChange();
		handleSubmit();
	};

	render () {
		const { name, completed, handleDoubleClick, handleClick, isActive } = this.props;
		return (
			<div key='latest-data' className='latest-data'>
				<Checkbox
					checked={ completed } onCheck={ this.handleCheck }
				/>
				<div className='label-text'>
					<p onDoubleClick={ handleDoubleClick }>{ name }</p>
					<p onClick={ handleClick }>history</p>
					<DeleteButton
						isActive={ isActive }
						handleClick={ this.onDeleteTodo }
						isButtonEnabled={ this.btnEnabled }
					/>
				</div>
			</div>
		);
	}
}

export default Todo;
