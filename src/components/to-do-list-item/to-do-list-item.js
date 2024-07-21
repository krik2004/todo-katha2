import './to-do-list-item.css'
import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import Timer from '../timer/'

const ToDoListItem = (props) => {
  const [label, setLabel] = useState(props.label)

  const {
    onToggleDone,
    timer,
    onDeleted,
    done,
    dateOfCreate,
    onEditLabel,
    isEditing,
    startTimer,
    stopTimer,
    onSaveEdited,
  } = props

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
      <div className="view">
        <input id="toggle" className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
        <div className="label-container" /* htmlFor="toggle"*/>
          <span id="toggle-label" className="title">
            {label}
          </span>
          <Timer timer={timer} done={done} startTimer={(e) => startTimer(e)} stopTimer={() => stopTimer()} />{' '}
          <span className="created"> ... created {timeDistance}</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={onEditLabel} aria-label="Edit item" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete item" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSaveEdited(label)
        }}
      >
        <input type="text" className="edit" onChange={(e) => setLabel(e.target.value)} value={label} />
      </form>
    </li>
  )
}
export default ToDoListItem

ToDoListItem.defaultProps = {
  label: 'TEST1',
  done: true,
  isEditing: false,
}

ToDoListItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  label: PropTypes.string,
  timer: PropTypes.number,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool,
  dateOfCreate: PropTypes.instanceOf(Date).isRequired,
  onEditLabel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  onSaveEdited: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}
