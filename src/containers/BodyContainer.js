import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { observer, inject } from 'mobx-react';
import AddForm from '../components/AddForm';
import TodoList from '../components/TodoList/TodoList';
import UpdateButton from '../components/UpdateButton';

@inject((allStores) => ({
	addTodo: allStores.TodoStore.addTodo,
	showAddForm: allStores.TodoStore.showAddForm,
	setRange: allStores.TodoStore.setRange
}))

@observer
class BodyContainer extends Component {
	render () {
		const { showAddForm, setRange } = this.props;
		return (
			<Paper
				zDepth={ 5 }
				rounded={ false }
				className='paper-field'
			>
				{ showAddForm && <AddForm onSubmit={ this.props.addTodo } /> }
				<TodoList />
				<UpdateButton handleClick={ setRange } />
			</Paper>
		);
	}
}

export default BodyContainer;
