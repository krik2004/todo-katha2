import './to-do-list-item.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import Timer from '../timer/'

export default class ToDoListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: props.label,
      timer: props.timer,
    }
  }

  onInputChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault()
    const { onSaveEdited } = this.props
    const { label } = this.state
    onSaveEdited(label)
  }

  render() {
    const { label, timer, onToggleDone, onDeleted, done, dateOfCreate, onEditLabel, isEditing, startTimer, stopTimer } =
      this.props

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
          <label /* htmlFor="toggle"*/>
            <span id="toggle-label" className="title">
              {label}
            </span>
            <Timer timer={timer} done={done} startTimer={() => startTimer()} stopTimer={() => stopTimer()} />{' '}
            <span className="created"> ... created {timeDistance}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditLabel} aria-label="Edit item" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete item" />
        </div>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" className="edit" onChange={this.onInputChange} value={this.state.label} />
        </form>
      </li>
    )
  }
}

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
