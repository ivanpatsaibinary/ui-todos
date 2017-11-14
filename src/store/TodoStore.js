import { observable, action } from 'mobx';
import axios from 'axios';

class TodoStore {
	@observable todos = [];
	@observable activeTodoId;
	@observable limit = 2;
	@observable skip = 0;

	@action.bound
	fetchTodos () {
		axios.get('https://stormy-castle-67867.herokuapp.com/api/Todos', {
			params: {
				filter: {
					limit: this.limit,
					skip: this.skip
				}
			}
		}).then((res) => {
			this.todos = [...this.todos, ...res.data];
		});
	}

	@action.bound
	setRange () {
		this.skip = this.limit;
		this.limit = 2 * this.limit;
		this.fetchTodos();
	}

	@action.bound
	addTodo (name) {
		axios.post('https://stormy-castle-67867.herokuapp.com/api/Todos', { name }).then((res) => {
			this.fetchTodos();
		});
	}

	@action.bound
	deleteTodo (id) {
		axios.delete('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id).then((res) => {
			this.fetchTodos();
		});
	}

	@action.bound
	updateTodo (id, name, completed) {
		axios.put('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id, { id, name, completed }).then((res) => {
			this.fetchTodos();
		});
	}

	@action.bound
	setActiveTodoId (id) {
		this.activeTodoId = id;
	}
}


let store = new TodoStore();

export default store;