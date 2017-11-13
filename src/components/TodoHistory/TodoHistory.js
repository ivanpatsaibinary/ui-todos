import React, { Component } from 'react';

class TodoHistory extends Component {
	render () {
		const { name } = this.props.data;
		return (
			<div>{ name }</div>
		);
	}
}

export default TodoHistory;