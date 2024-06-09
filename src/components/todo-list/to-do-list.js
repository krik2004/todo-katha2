import React from 'react'
import PropTypes from 'prop-types'

import ToDoListItem from '../to-do-list-item/to-do-list-item'
import './todo-list.css'

const ToDoList = ({
	todos,
	filter,
	onToggleDone,
	onDeleted,
	onEditLabel,
	onSaveEdited,
}) => {
	let filteredTodos = todos
	if (filter === 'completed') {
		filteredTodos = todos.filter(todo => todo.done)
	} else if (filter === 'active') {
		filteredTodos = todos.filter(todo => !todo.done)
	}
	const elements = filteredTodos.map(item => {
		return (
			<ToDoListItem
				key={item.id}
				label={item.label}
				done={item.done}
				dateOfCreate={item.dateOfCreate}
				important={item.important}
				onDeleted={() => onDeleted(item.id)}
				onToggleDone={() => onToggleDone(item.id)}
				onEditLabel={e => onEditLabel(item.id, e)}
				isEditing={item.isEditing}
				onSaveEdited={label => onSaveEdited(item.id, label)}
			/>
		)
	})
	return <ul className='list-group todo-list'>{elements}</ul>
}

ToDoList.defaultProps = {
	filter: 'active',
	onDeleted: () => {
		console.log('onDelete default function')
	},
	onToggleDone: () => {
		console.log('onToggleDone default function')
	},
}
ToDoList.propTypes = {
	todos: PropTypes.array,
	onDeleted: PropTypes.func,
	onToggleDone: PropTypes.func,
	filter: PropTypes.string,
	onEditLabel: PropTypes.func,
	isEditing: PropTypes.bool,
	onSaveEdited: PropTypes.func,
}
export default ToDoList
