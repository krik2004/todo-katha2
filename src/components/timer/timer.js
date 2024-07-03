import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import './timer.css'
import PropTypes from 'prop-types'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.timer,
      min: 5,
      sec: 0,
      isRunning: false,
    }
    this.interval = null
  }

  startTimer = () => {
    // const { min, sec } = this.state
    // const totalSeconds = parseInt(min, 10) * 60 + parseInt(sec, 10)
    if (!this.state.isRunning) {
      this.setState({ isRunning: true }, () => {
        this.interval = setInterval(() => {
          const { timer } = this.state
          if (timer > 0) {
            this.setState({ timer: timer - 1 })
          } else {
            clearInterval(this.interval)
          }
        }, 1000)
      })
    }
  }

  stopTimer = () => {
    this.setState({ isRunning: false })
    clearInterval(this.interval)
  }

  resetTimer = () => {
    this.setState({
      timer: 0,
      isRunning: false,
    })
    clearInterval(this.interval)
  }

  render() {
    const { timer } = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    return (
      <span className="description">
        <button onClick={this.startTimer} className="icon icon-play"></button>
        <button onClick={this.stopTimer} className="icon icon-pause"></button>
        {'  '}
        {formattedTime}
        {'  '}
      </span>
    )
  }
}
Timer.propTypes = {
  timer: PropTypes.number,
}
{
  /* <h2>Timer: {this.state.timer}</h2>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.stopTimer}>Stop</button>
        <button onClick={this.resetTimer}>Reset</button> */
}
