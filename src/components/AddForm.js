import React, { Component } from 'react';
import { TextField } from 'material-ui';
import { observable } from 'mobx';


class AddFrom extends Component {
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
					floatingLabelText='What are you going to do?'
					type='text'
					fullWidth={ true }
					className='add-form'
					value={ this.inputValue }
					onChange={ this.handleChange }
				/>
			</form>
		);
	}
}

export default AddFrom;
