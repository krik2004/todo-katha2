import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class Newtaskform extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
    timer: '',
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

  onValueChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
	const timer = parseInt(this.state.min, 10) * 60 + parseInt(this.state.sec, 10)
    if (e.key === 'Enter' && e.target.value !== '') {
      e.preventDefault()
      this.props.addItem(this.state.label, timer)
      this.setState({
        label: '',
        min: '',
        sec: '',
		
      })
    }
  }

  render() {
    return (
      <Fragment>
        <form className="new-todo-form">
          {/* onSubmit={this.onSubmit} */}
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onValueChange}
            value={this.state.label}
            onKeyDown={this.onSubmit}
          />

          <input
            className="new-todo-form__timer"
            type="number"
            min={0}
            max={60}
            placeholder="Min"
            onChange={this.onMinChange}
            value={this.state.min}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            min={0}
            max={60}
            placeholder="Sec"
            onChange={this.onSecChange}
            value={this.state.sec}
          />
        </form>
      </Fragment>
    )
  }
}
