import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { observer, inject } from 'mobx-react';

@inject((allStores) => ({
	addTodo: allStores.TodoStore.addTodo
}))

@observer
class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showAddForm: false,
			inputValue: ''
		};
	}

	handleSubmit (e) {
		e.preventDefault();
		const { inputValue } = this.state;
		console.log(e.target);
		this.props.addTodo(inputValue);
		this.setState({ inputValue: '' });
	}

	render () {
		const { showAddForm, inputValue } = this.state;
		console.log(this.props);
		return (
			<MuiThemeProvider className='App'>
				<div className='form'>
					<AppBar
						iconElementRight={ <IconButton
							onClick={ () => {
								this.setState({ showAddForm: true });
								console.log('click', this.state);
							} }
						>
							<Add />
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
									this.setState({ inputValue: e.target.value });
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
