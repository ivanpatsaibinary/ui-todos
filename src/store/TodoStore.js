import { observable } from 'mobx';

class TodoStore {
	@observable todos = [{ name: 'todo 1' }, { name: 'todo 2' }, { name: 'todo 3' }];
}

let store = new TodoStore();

export default store;