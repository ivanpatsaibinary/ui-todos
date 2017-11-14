import { observable, action } from 'mobx';
import axios from 'axios';

class TodoStore {
	@observable todos = [];
	@observable activeTodoId;
	@observable limit = 2;
	@observable btnDisabled = false;
	@observable addFormDisabled = false;
	@observable showEditForm = false;
	@observable showHistory = false;

	@action.bound
	fetchTodos () {
		axios.get('https://stormy-castle-67867.herokuapp.com/api/Todos', {
			params: {
				filter: {
					limit: this.limit
				}
			}
		}).then((res) => {
			this.todos = [...res.data];
		});
	}

	@action.bound
	changeEditFormState (state = true) {
		this.showEditForm = state;
	}

	@action.bound
	changeHistoryState (state = true) {
		this.showHistory = state;
	}

	@action.bound
	setRange () {
		this.limit += 2;
		this.fetchTodos();
	}

	@action.bound
	addTodo (name) {
		this.addFormDisabled = true;
		axios.post('https://stormy-castle-67867.herokuapp.com/api/Todos', { name }).then((res) => {
			this.todos.unshift(res.data);
			this.addFormDisabled = false;
		});
		this.limit += 1;
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
		this.limit -= 1;
	}

	@action.bound
	updateTodo (id, name, completed) {
		axios.put('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id, { id, name, completed }).then((res) => {
			console.log(res);
			const objIndex = this.todos.findIndex(item => id === item.id);
			this.todos[objIndex] = { ...res.data };
			console.log(this.todos);
		});
	}

	@action.bound
	setActiveTodoId (id) {
		this.activeTodoId = id;
	}
}


let store = new TodoStore();

export default store;