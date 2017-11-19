//todo update todohistory after todo update
//todo remove todoHistory after click on other todo item
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import './todoHistory.css';
import { Divider } from 'material-ui';
import DeleteButton from '../DeleteButton';

@inject((allStores) => ({
		setActiveHistoryId: allStores.TodoHistoryStore.setActiveHistoryId,
		deleteTodoHistoryItem: allStores.TodoHistoryStore.deleteTodoHistoryItem,
		btnDisabled: allStores.TodoHistoryStore.btnDisabled,
		activeHistoryId: allStores.TodoHistoryStore.activeHistoryId
	}
))

@observer
class TodoHistory extends Component {

	@observable btnEnabled = true;

	onDeleteTodoHistory = () => {
		const { setActiveHistoryId, deleteTodoHistoryItem, data: { id } } = this.props;
		this.btnEnabled = false;
		setActiveHistoryId(id);
		deleteTodoHistoryItem(id).then(() => this.btnEnabled = true);
	};

	render () {
		const { data: { name, id }, activeHistoryId } = this.props;
		const isActive = activeHistoryId === id;
		return [
			<div key={ `history-item-${id}` } className='history-item-container'>
				<div className='text'>
					{ name }
				</div>
				<DeleteButton
					isActive={ isActive }
					handleClick={ this.onDeleteTodoHistory }
					isButtonEnabled={ this.btnEnabled }
				/>
			</div>,
			<Divider key={ `history-divider-${id}` } />
		];
	}
}

export default TodoHistory;
