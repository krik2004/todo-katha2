import React, { useState } from 'react'
// import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ToDoList from './components/todo-list'
import Newtaskform from './components/new-task-form'
import Footer from './components/footer'
import './index.css'

const App = () => {
  let maxID = 100
  const [todoData, setTodoData] = useState([
    {
      label: 'task 1',
      id: 1,
      done: false,
      dateOfCreate: new Date(),
      isEditing: false,
      timer: 140,
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
      isRunning: false,
      timerId: null,
    },
    {
      label: 'task 3',
      id: 3,
      done: false,
      dateOfCreate: new Date(),
      isEditing: false,
      timer: 340,
      isRunning: false,
      timerId: null,
    },
  ])
  const [filter, setFilter] = useState('all')

  const leftCount = todoData.filter((el) => !el.done).length

  const stopTimer = (taskId) => {
    setTodoData((prevState) => {
      const updatedTasks = prevState.map((task) => {
        if (task.id === taskId && task.isRunning) {
          clearInterval(task.interval)
          return { ...task, isRunning: false, interval: null }
        }
        return task
      })
      return updatedTasks
    })
  }

  const startTimer = (taskId) => {
    setTodoData((prevState) => {
      const updatedTasks = prevState.map((task) => {
        if (task.id === taskId && !task.isRunning) {
          return { ...task, isRunning: true }
        }
        return task
      })
      updatedTasks.forEach((task) => {
        if (task.isRunning && !task.interval) {
          const interval = setInterval(() => {
            setTodoData((prevState) => {
              const updatedTasks = prevState.map((task) => {
                if (task.id === taskId && task.isRunning) {
                  return { ...task, timer: task.timer - 1 }
                }
                return task
              })
              return updatedTasks
            })
          }, 1000)
          task.interval = interval
        } else if (task.isRunning && task.interval) {
          console.log(`таймер для ${task.id} уже запущен`)
        }
      })
      return updatedTasks
    })
  }

  const onEditLabel = (id, e) => {
    e.preventDefault()
    setTodoData((todoData) => {
      const idxEdit = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idxEdit]
      const newItem = { ...oldItem, isEditing: !oldItem.isEditing }
      const newArray = todoData.with([idxEdit], newItem)
      return newArray
    })
  }

  const onSaveEdited = (id, label) => {
    setTodoData((todoData) => {
      const idxSave = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idxSave]
      const newItem = { ...oldItem, label, isEditing: !oldItem.isEditing }
      const newArray = todoData.with([idxSave], newItem)
      return newArray
    })
  }

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      if (newItem.done && oldItem.isRunning) {
        clearInterval(oldItem.interval)
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      } else {
        return todoData.map((item) => (item.id === id ? newItem : item))
      }
    })
  }

  const addItem = (label, timer) => {
    const newItem = {
      label,
      id: maxID++,
      done: false,
      dateOfCreate: new Date(),
      isEditing: false,
      timer,
      isRunning: false,
    }
    setTodoData((todoData) => {
      const newArray = [...todoData, newItem]
      return  newArray 
    })
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      const newArray = [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)]
      return newArray
    })
  }


  // const setFilter2 = (filterOption) => {
  //   this.setState({ filter: filterOption })
  // }

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((todo) => !todo.done))
  }


  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Newtaskform addItem={addItem} />
      </header>
      <section className="main">
        <ToDoList
          todos={todoData}
          startTimer={startTimer}
          stopTimer={stopTimer}
          onEditLabel={onEditLabel}
          onSaveEdited={onSaveEdited}
          onToggleDone={onToggleDone}
          onDeleted={deleteItem}
          filter={filter}
          setFilter={setFilter}
        />
        <Footer 
        leftCount={leftCount} 
        setFilter={setFilter} 
        filter={filter} 
        clearCompleted={clearCompleted} 
        />
      </section>
    </section>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
