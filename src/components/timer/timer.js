import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './timer.css'

const Timer = ({ timer, done, startTimer, stopTimer }) => {
  const [formattedTime, setFormattedTime] = useState('00:00')

  useEffect(() => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    setFormattedTime(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
  }, [timer])

  return (
    <span className="description">
      <button onClick={!done ? startTimer : null} className="icon icon-play"></button>
      <button onClick={stopTimer} className="icon icon-pause"></button>
      {'  '}
      {formattedTime}
      {'  '}
    </span>
  )
}

Timer.propTypes = {
  timer: PropTypes.number,
  done: PropTypes.bool,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}

export default Timer
