import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import { observer, inject } from 'mobx-react';

import './todoHistory.css';
import { Divider } from 'material-ui';

@inject((allStores) => ({
		setActiveHistoryId: allStores.TodoHistoryStore.setActiveHistoryId,
		deleteTodoHistory: allStores.TodoHistoryStore.deleteTodoHistory,
		btnDisabled: allStores.TodoHistoryStore.btnDisabled,
		activeHistoryId: allStores.TodoHistoryStore.activeHistoryId
	}
))

@observer
class TodoHistory extends Component {
	render () {
		const { data: { name, id }, data, activeHistoryId, setActiveHistoryId, deleteTodoHistory, btnDisabled } = this.props;
		const isActive = activeHistoryId === id;
		return [
			<div key={ `history-item-${id}` } className='history-item-container'>
				<div className='text'>
					{ name }
				</div>
				<div className='delete-icon-container'>
					<IconButton
						onClick={ () => {
							setActiveHistoryId(id);
							deleteTodoHistory(id);
							console.log(activeHistoryId, id, btnDisabled, data);

						} }
						disabled={ btnDisabled && isActive }
					>
						<Delete color='#FAFAFF' />
					</IconButton>
				</div>
			</div>,
			<Divider key={ `history-divider-${id}` } />
		];
	}
}

export default TodoHistory;