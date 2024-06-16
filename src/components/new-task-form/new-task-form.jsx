import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Newtaskform extends Component {
	state = {
		label: '',
	}

	static defaultProps = {
		addItem: () => {
			console.log('addItem function was not passed')
		},
	}
	static propTypes = {
		label: PropTypes.string,
		addItem: PropTypes.func,
	}

	onInputChange = e => {
		this.setState({
			label: e.target.value,
		})
	}

	onSubmit = e => {
		e.preventDefault()

		this.props.addItem(this.state.label)

		this.setState({
			label: '',
		})
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input
					className='new-todo'
					placeholder='What needs to be done?'
					onChange={this.onInputChange}
					value={this.state.label}
				/>
			</form>
		)
	}
}
