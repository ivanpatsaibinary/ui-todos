import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { observable } from 'mobx';

import './App.css';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import BodyContainer from './containers/BodyContainer';
import Header from './components/Header';

@inject((allStores) => ({
	showAddForm: allStores.TodoStore.showAddForm,
	toggleShowAddFrom: allStores.TodoStore.toggleShowAddFrom
}))
//todo remove empty div if devtools is absent
@observer
class App extends Component {

	render () {
		return (
			<MuiThemeProvider className='App'>
				<div>
					<div className='form'>
						<Header
							handleClick={ this.props.toggleShowAddFrom }
							isActive={ this.props.showAddForm }
						/>
						<BodyContainer />
					</div>
					<DevTools />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
