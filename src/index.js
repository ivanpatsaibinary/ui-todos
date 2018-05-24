import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import TodoStore from './store/TodoStore';
import TodoHistoryStore from './store/TodoHistory';
import registerServiceWorker from './registerServiceWorker';

const stores = { TodoStore, TodoHistoryStore };


ReactDOM.render(
	<Provider { ...stores }>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
