import React, { Component } from 'react'

import ReactDOM from 'react-dom/client'

import ToDoList from './components/todo-list'
import Newtaskform from './components/new-task-form'
import Footer from './components/footer'

import './index.css'

class App extends Component {
  maxID = 100

  constructor() {
    super()
    this.state = {
      todoData: [
        {
          label: 'task 1',
          id: 1,
          done: false,
          dateOfCreate: new Date(),
          isEditing: false,
          timer: 140,
          // min: 1,
          // sec: 0,
          isRunning: false,
          timerId: null,
        },
        {
          label: 'task 2',
          id: 2,
          done: false,
          dateOfCreate: new Date(),
          isEditing: false,
          timer: 240,
          // min: 4,
          // sec: 0,
          isRunning: false,
          timerId: null,
        },
        {
          label: 'task 3',
          id: 3,
          done: false,
          dateOfCreate: new Date(),
          isEditing: false,
          timer: 240,
          // min: 4,
          // sec: 0,
          isRunning: false,
          timerId: null,
        },
      ],
      filter: 'all',
    }
  }
  stopTimer = (taskId) => {
    this.setState((prevState) => {
      const { todoData } = prevState
      const updatedTasks = todoData.map((task) => {
        if (task.id === taskId && task.isRunning) {
          clearInterval(task.interval)
          return { ...task, isRunning: false, interval: null }
        }
        return task
      })

      return { todoData: updatedTasks }
    })
  }

  startTimer = (taskId) => {
    this.setState((prevState) => {
      const { todoData } = prevState
      const updatedTasks = todoData.map((task) => {
        if (task.id === taskId && !task.isRunning) {
          return { ...task, isRunning: true }
        }
        return task
      })

      updatedTasks.forEach((task) => {
        if (task.isRunning && !task.interval) {
          const interval = setInterval(() => {
            this.setState((prevState) => {
              const { todoData } = prevState
              const updatedTasks = todoData.map((task) => {
                if (task.id === taskId && task.isRunning) {
                  return { ...task, timer: task.timer - 1 }
                }
                return task
              })
              return { todoData: updatedTasks }
            })
          }, 1000)

          task.interval = interval
        } else if (task.isRunning && task.interval) {
          console.log(`таймер для ${task.id} уже запущен`)
        }
      })

      return { todoData: updatedTasks }
    })
  }

  // startTimer2 = () => {
  //   // const { min, sec } = this.state
  //   // const totalSeconds = parseInt(min, 10) * 60 + parseInt(sec, 10)
  //   if (!this.state.isRunning) {
  //     this.setState({ isRunning: true }, () => {
  //       this.interval = setInterval(() => {
  //         const { timer } = this.state
  //         if (timer > 0) {
  //           this.setState({ timer: timer - 1 })
  //         } else {
  //           clearInterval(this.interval)
  //         }
  //       }, 1000)
  //     })
  //   }
  // }

  addItem = (label, timer) => {
    const newItem = {
      label,
      id: this.maxID++,
      done: false,
      dateOfCreate: new Date(),
      isEditing: false,
      timer,
      isRunning: false,
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return { todoData: newArray }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

    
      if (newItem.done && oldItem.isRunning) {
        clearInterval(oldItem.interval)
        return {
          todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
        }
      }

      return {
        todoData: todoData.map((item) => (item.id === id ? newItem : item)),
      }
    })
  }

  setFilter = (filterOption) => {
    this.setState({ filter: filterOption })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((todo) => !todo.done) }))
  }

  onEditLabel = (id, e) => {
    e.preventDefault()
    this.setState(({ todoData }) => {
      const idxEdit = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idxEdit]
      const newItem = { ...oldItem, isEditing: !oldItem.isEditing }
      const newArray = todoData.with([idxEdit], newItem)
      return { todoData: newArray }
    })
  }

  onSaveEdited = (id, label) => {
    this.setState(({ todoData }) => {
      const idxSave = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idxSave]
      const newItem = { ...oldItem, label, isEditing: !oldItem.isEditing }
      const newArray = todoData.with([idxSave], newItem)
      return { todoData: newArray }
    })
  }

  render() {
    const { todoData, filter, dateOfCreate, isEditing } = this.state
    const leftCount = todoData.filter((el) => !el.done).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Newtaskform addItem={this.addItem} />
        </header>
        <section className="main">
          <ToDoList
            todos={todoData}
            filter={filter}
            setFilter={this.setFilter}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            dateOfCreate={dateOfCreate}
            onEditLabel={this.onEditLabel}
            isEditing={isEditing}
            onSaveEdited={this.onSaveEdited}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            leftCount={leftCount}
            setFilter={this.setFilter}
            filter={filter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
