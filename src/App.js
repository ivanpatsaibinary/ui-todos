import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';
import Paper from 'material-ui/Paper';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { observer, inject } from 'mobx-react';

@inject((allStores) => ({
	addTodo: allStores.TodoStore.addTodo,
	inputValue: allStores.TodoStore.inputValue,
	setInputValue: allStores.TodoStore.setInputValue,
	showAddForm: allStores.TodoStore.showAddForm,
	changeAddFormState: allStores.TodoStore.changeAddFormState
}))

@observer
class App extends Component {
	handleSubmit (e) {
		e.preventDefault();
		const { addTodo } = this.props;
		addTodo();
	}

	render () {
		const { inputValue, setInputValue, showAddForm, changeAddFormState } = this.props;
		return (
			<MuiThemeProvider className='App'>
				<div className='form'>
					<AppBar
						iconElementRight={ <IconButton
							onClick={ () => {
								changeAddFormState(!showAddForm);
							} }
						>
							{ showAddForm ? <Clear /> : <Add /> }
						</IconButton> }
						showMenuIconButton={ false }
					/>
					<Paper
						zDepth={ 5 }
						rounded={ false }
						className='paper-field'
					>
						<form onSubmit={ this.handleSubmit.bind(this) }>
							<TextField
								floatingLabelText='What are you going to do?'
								type='text'
								fullWidth={ true }
								className={ `add-form ${showAddForm ? '' : 'hidden'}` }
								value={ inputValue }
								onChange={ (e) => {
									setInputValue(e.target.value);
								} }
							/>
						</form>
						<TodoList />
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
