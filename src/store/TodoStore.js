import { observable, action } from 'mobx';
import axios from 'axios';

//todo add filter as is on server after update, delete, create, checbox change

class TodoStore {
	@observable todos = [];
	@observable activeTodoId;
	limit = 2;
	skip = 0;
	@observable btnDisabled = false;
	@observable showEditForm = false;
	@observable showHistory = false;
	@observable showAddForm = false;

	constructor () {
		this.fetchTodos();
	}

	@action.bound
	toggleShowAddFrom () {
		this.showAddForm = !this.showAddForm;
	}

	@action.bound
	fetchTodos (limit) {
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
	setRange () {
		this.skip += 2;
		this.fetchTodos();
	}

	@action.bound
	addTodo (name) {
		axios.post('https://stormy-castle-67867.herokuapp.com/api/Todos', { name }).then((res) => {
			this.todos.unshift(res.data);
			this.showAddForm = false;
		});
	}

	@action.bound
	deleteTodo () {
		this.btnDisabled = true;
		console.log(this.activeTodoId);
		return axios.delete('https://stormy-castle-67867.herokuapp.com/api/Todos/' + this.activeTodoId).then((res) => {
			//todo update to use Sets
			const objIndex = this.todos.findIndex(item => this.activeTodoId === item.id);
			this.todos.splice(objIndex, 1);
			// this.btnDisabled = false;
			this.skip -= 1;
		});
	}

	//todo update should not create new history item if checkbox changes state
	@action.bound
	updateTodo (id, name, completed) {
		axios.patch('https://stormy-castle-67867.herokuapp.com/api/Todos/' + id, {
			id,
			name,
			completed
		}).then((res) => {
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
