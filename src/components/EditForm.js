import React, { Component } from 'react';
import { TextField } from 'material-ui';
import { observable } from 'mobx';

class EditFrom extends Component {
	@observable inputValue;

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.inputValue);
	};

	handleChange = (e) => {
		this.inputValue = e.target.value;
	};

	render () {
		return (
			<form onSubmit={ this.handleSubmit }>
				<TextField
					floatingLabelText='Edit your todo'
					type='text'
					fullWidth={ true }
					value={ this.inputValue }
					defaultValue={ this.props.defaultValue }
					onChange={ this.handleChange }
				/>
			</form>

		);
	}
}

export default EditFrom;
