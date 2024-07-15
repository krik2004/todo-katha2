import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onValueChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(e.target.value)
  }

  const onSecChange = (e) => {
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    let timer = 0
    if (min !== '' || sec !== '') {
      timer = parseInt(min, 10) * 60 + parseInt(sec, 10)
    }

    if (e.key === 'Enter' && label !== '') {
      e.preventDefault()
      addItem(label, timer)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onValueChange}
        value={label}
        onKeyDown={onSubmit}
      />

      <input
        className="new-todo-form__timer"
        type="number"
        min={0}
        max={60}
        placeholder="Min"
        onChange={onMinChange}
        value={min}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min={0}
        max={60}
        placeholder="Sec"
        onChange={onSecChange}
        value={sec}
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  addItem: () => {
    console.log('addItem function was not passed')
  }
}
NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired
}

export default NewTaskForm
