import { observable, action } from 'mobx';
import axios from 'axios';

class TodoStore {
	@observable todos = [];
	@observable activeTodoId;
	@observable limit = 2;
	@observable skip = 0;

	@action.bound
	fetchTodos (update) {
		if (!update) {
			this.limit = 2;
			if (!this.todos.length) {
				this.skip = 0;
			}
		}
		console.log(this.skip, this.limit);
		axios.get('https://stormy-castle-67867.herokuapp.com/api/Todos', {
			params: {
				filter: {
					limit: this.limit,
					skip: this.skip
				}
			}
		}).then((res) => {
			this.todos = update ? [...res.data] : [...this.todos, ...res.data];
		});
	}

	@action.bound
	setRange () {
		this.skip += this.limit;
		this.fetchTodos();
	}

	setUpdatedRange () {
		this.limit = this.skip + this.limit;
		this.skip = 0;
	}

	@action.bound
	addTodo (name) {
		axios.post('https://stormy-castle-67867.herokuapp.com/api/Todos', { name }).then((res) => {
			this.setUpdatedRange();
			this.fetchTodos(true);
		});
	}

	@action.bound
	deleteTodo (id) {
		axios.delete('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id).then((res) => {
			this.setUpdatedRange();
			this.fetchTodos(true);
		});
	}

	@action.bound
	updateTodo (id, name, completed) {
		axios.put('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id, { id, name, completed }).then((res) => {
			this.setUpdatedRange();
			this.fetchTodos(true);
		});
	}

	@action.bound
	setActiveTodoId (id) {
		this.activeTodoId = id;
	}
}


let store = new TodoStore();

export default store;