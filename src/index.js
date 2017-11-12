import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import TodoStore from './store/TodoStore';
import registerServiceWorker from './registerServiceWorker';

const stores = { TodoStore };
console.log(TodoStore.todos);


ReactDOM.render(
	<Provider { ...stores }>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
