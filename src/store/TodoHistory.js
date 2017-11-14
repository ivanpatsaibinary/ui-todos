import { observable, action } from 'mobx';
import axios from 'axios';


class TodoHistory {
	@observable todoHistory = [];

	@action.bound
	fetchTodoHistory (id) {
		axios.get('https://stormy-castle-67867.herokuapp.com/api/Todo_Histories?filter[where][todoId]=' + id).then((res) => {
			console.log(res);
			this.todoHistory = [...res.data];
		});
	}
}

let store = new TodoHistory();

export default store;