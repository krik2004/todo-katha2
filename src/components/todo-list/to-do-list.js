import React from 'react'
import PropTypes from 'prop-types'

import ToDoListItem from '../to-do-list-item/to-do-list-item'
import './todo-list.css'

function ToDoList({ todos, filter, onToggleDone, onDeleted, onEditLabel, onSaveEdited }) {
  let filteredTodos = todos
  if (filter === 'completed') {
    filteredTodos = todos.filter((todo) => todo.done)
  } else if (filter === 'active') {
    filteredTodos = todos.filter((todo) => !todo.done)
  }
  const elements = filteredTodos.map((item) => (
    <ToDoListItem
      key={item.id}
      label={item.label}
      done={item.done}
      dateOfCreate={item.dateOfCreate}
      important={item.important}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      onEditLabel={(e) => onEditLabel(item.id, e)}
      isEditing={item.isEditing}
      onSaveEdited={(label) => onSaveEdited(item.id, label)}
    />
  ))
  return <ul className="list-group todo-list">{elements}</ul>
}

ToDoList.defaultProps = {
  filter: 'active',
  onDeleted: () => {
    // eslint-disable-next-line no-console
    console.log('onDelete default function')
  },
  onToggleDone: () => {
    // eslint-disable-next-line no-console
    console.log('onToggleDone default function')
  },
}

const TodoItemShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  dateOfCreate: PropTypes.instanceOf(Date).isRequired,
  isEditing: PropTypes.bool.isRequired,
})
ToDoListItem.defaultProps = {
  isEditing: false,
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(TodoItemShape).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  filter: PropTypes.string,
  onEditLabel: PropTypes.func.isRequired,
  onSaveEdited: PropTypes.func.isRequired,
}
export default ToDoList
