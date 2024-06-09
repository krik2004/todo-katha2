import './to-do-list-item.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class ToDoListItem extends Component {
	state = {
		label: this.props.label,
	}

	onInputChange = e => {
		this.setState({
			label: e.target.value,
		})
	}
	onSubmitForm = e => {
		e.preventDefault()
		this.props.onSaveEdited(this.state.label)
	}

	render() {
		const {
			label,
			onToggleDone,
			onDeleted,
			done,
			dateOfCreate,
			onEditLabel,
			isEditing,
		} = this.props

		let classNames = 'active'
		if (done) {
			classNames = 'completed'
		} else if (isEditing) {
			classNames = 'editing'
		}

		const timeDistance = formatDistanceToNow(dateOfCreate, {
			addSuffix: true,
			includeSeconds: true,
		})

		return (
			<li className={classNames}>
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
						onChange={onToggleDone}
						checked={done}
					></input>
					<label>
						<span className='description'>{label}</span>
						<span className='created'> ... created {timeDistance}</span>
					</label>
					<button className='icon icon-edit' onClick={onEditLabel}></button>
					<button className='icon icon-destroy' onClick={onDeleted}></button>
				</div>
				<form onSubmit={this.onSubmitForm}>
					<input
						type='text'
						className='edit'
						onChange={this.onInputChange}
						value={this.state.label}
					/>
				</form>
			</li>
		)
	}
}

ToDoListItem.defaultProps = {
	label: 'TEST',
	onDeleted: () => {
		console.log('onDelete default function')
	},
	onToggleDone: () => {
		console.log('onToggleDone default function')
	},
	done: true,
}

ToDoListItem.propTypes = {
	label: PropTypes.string,
	onDeleted: PropTypes.func,
	onToggleDone: PropTypes.func,
	done: PropTypes.bool,
	dateOfCreate: PropTypes.object,
	onEditLabel: PropTypes.func,
	isEditing: PropTypes.bool,
}
