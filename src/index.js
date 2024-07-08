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
        },
      ],
      filter: 'all',
    }
  }

  startTimer = (taskId) => {
    console.log('lol')
    const updatedTasks = this.state.todoData.map((task) => {
      if (task.id === taskId && !task.isRunning) {
        return { ...task, isRunning: true }
      } else {
        return task
      }
    })

    this.setState({ todoData: updatedTasks }, () => {
      updatedTasks.forEach((task) => {
        if (task.isRunning) {
          task.interval = setInterval(() => {
            if (task.timer > 0) {
              task.timer--
              this.setState({ todoData: updatedTasks })
            } else {
              clearInterval(task.interval)
            }
          }, 1000)
        }
      })
    })
  }

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
      const newArray = todoData.with([idx], newItem)
      return { todoData: newArray }
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
