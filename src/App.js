import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showAddForm: false
		};
	}

	render () {
		const { showAddForm } = this.state;
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
							<TextField
								floatingLabelText='What are you going to do?'
								type='text'
								fullWidth={ true }
								className={ `add-form ${showAddForm ? '' : 'hidden'}` }
							/>
							<TodoList TodoStore={this.props.TodoStore} />
						</Paper>
					</div>
				</MuiThemeProvider>
		);
	}
}

export default App;
