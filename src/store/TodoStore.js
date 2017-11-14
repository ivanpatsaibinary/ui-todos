import { observable, action } from 'mobx';
import axios from 'axios';

class TodoStore {
	@observable todos = [];
	@observable activeTodoId;
	@observable limit = 2;
	@observable skip = 0;
	@observable btnDisabled = false;

	@action.bound
	fetchTodos (update) {
		//todo fix fetch data after update, delete and remove
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
			this.todos.unshift(res.data);
		});
	}

	@action.bound
	deleteTodo (id) {
		this.btnDisabled = true;
		axios.delete('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id).then((res) => {
			//todo update to use Sets
			const objIndex = this.todos.findIndex(item => id === item.id);
			this.todos.splice(objIndex, 1);
			this.btnDisabled = false;
		});
	}

	@action.bound
	updateTodo (id, name, completed) {
		axios.put('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id, { id, name, completed }).then((res) => {
			console.log(res);
			const objIndex = this.todos.findIndex(item => id === item.id);
			this.todos[objIndex] = { ...res.data };
		});
	}

	@action.bound
	setActiveTodoId (id) {
		this.activeTodoId = id;
	}
}


let store = new TodoStore();

export default store;