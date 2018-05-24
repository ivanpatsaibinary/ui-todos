import { observable, action } from 'mobx';
import axios from 'axios';


class TodoHistory {
	@observable todoHistory = [];
	@observable activeHistoryId;

	@action.bound
	setActiveHistoryId (id) {
		this.activeHistoryId = id;
	}

	@action.bound
	fetchTodoHistory (id) {
		axios.get('https://stormy-castle-67867.herokuapp.com/api/Todo_Histories?filter[where][todoId]=' + id).then((res) => {
			console.log(res);
			this. tadoHistory = [...res.data];
		});
	}

	@action.bound
	deleteTodoHistoryItem () {
		return axios.delete('https://stormy-castle-67867.herokuapp.com/api/Todo_Histories/' + this.activeHistoryId).then((res) => {
			//todo update to use Sets
			const objIndex = this.todoHistory.findIndex(item => this.activeHistoryId === item.id);
			this.todoHistory.splice(objIndex, 1);
		});
	}
}

let store = new TodoHistory();

export default store;
