import { observable, action } from 'mobx';
import axios from 'axios';

class TodoStore {
	@observable todos = [];
	@observable activeTodoId;
	@observable limit = 2;
	@observable skip = 0;
	@observable btnDisabled = false;
	@observable addFormDisabled = false;
	@observable showEditForm = false;
	@observable showAddForm = false;
	@observable showHistory = false;
	@observable inputValue = '';

	@action.bound
	fetchTodos (limit) {
		console.log(this.skip, this.limit, this.skip, this.skip % 2, !!(this.skip % 2));

		axios.get('https://stormy-castle-67867.herokuapp.com/api/Todos', {
			params: {
				filter: {
					limit: limit ? limit : this.limit,
					skip: this.skip
				}
			}
		}).then((res) => {
			this.todos = [...this.todos, ...res.data];
		});
	}

	@action.bound
	changeEditFormState (state = true) {
		this.showEditForm = state;
	}

	@action.bound
	changeAddFormState (state = true) {
		this.showAddForm = state;
	}

	@action.bound
	changeHistoryState (state = true) {
		this.showHistory = state;
	}

	@action.bound
	setInputValue (value) {
		this.inputValue = value;
	}

	@action.bound
	setRange () {
		//todo fix function to return correct skip and limit
		if (this.skip && !!(this.skip % 2)) {
			this.limit = 1;
			this.skip += 2;
		} else {
			this.limit = 2;
			this.skip += 2;
		}
		this.fetchTodos();
	}

	@action.bound
	addTodo () {
		this.addFormDisabled = true;
		axios.post('https://stormy-castle-67867.herokuapp.com/api/Todos', { name: this.inputValue }).then((res) => {
			this.todos.unshift(res.data);
			this.addFormDisabled = false;
		});
		this.limit += 1;
	}

	@action.bound
	deleteTodo () {
		this.btnDisabled = true;
		axios.delete('https://stormy-castle-67867.herokuapp.com/api/Todos/' + this.activeTodoId).then((res) => {
			//todo update to use Sets
			const objIndex = this.todos.findIndex(item => this.activeTodoId === item.id);
			this.todos.splice(objIndex, 1);
			this.btnDisabled = false;
		});
		this.skip -= 1;
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