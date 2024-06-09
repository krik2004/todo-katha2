import React, { Component } from 'react'

import ReactDOM from 'react-dom/client'

import ToDoList from './components/todo-list'
import Newtaskform from './components/new-task-form'
import Footer from './components/footer'

import './index.css'

class App extends Component {
	constructor() {
		super()
		this.state = {
			todoData: [
				{
					label: 'Completed task',
					id: 1,
					done: false,
					dateOfCreate: new Date(),
					isEditing: false,
				},
				{
					label: 'Editing',
					id: 2,
					done: false,
					dateOfCreate: new Date(),
					isEditing: false,
				},
				{
					label: 'Active task',
					id: 3,
					done: false,
					dateOfCreate: new Date(),
					isEditing: false,
				},
			],
			filter: 'all',
		}
		console.log(this.state.todoData[0].dateOfCreate)
	}
	maxID = 100

	addItem = label => {
		const newItem = {
			label: label,
			id: this.maxID++,
			done: false,
			dateOfCreate: new Date(),
			editing: false,
		}

		this.setState(({ todoData }) => {
			const newArray = [...todoData, newItem]
			return { todoData: newArray }
		})
	}

	deleteItem = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id)
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
			return {
				todoData: newArray,
			}
		})
	}

	onToggleDone = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id)
			let oldItem = todoData[idx]
			let newItem = { ...oldItem, done: !oldItem.done }
			let newArray = todoData.with([idx], newItem)
			return { todoData: newArray }
		})
	}

	setFilter = filterOption => {
		this.setState({ filter: filterOption })
	}

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			return { todoData: todoData.filter(todo => !todo.done) }
		})
	}

	onEditLabel = (id,e) => {
		e.preventDefault()
		this.setState(({ todoData }) => {
			const idxEdit = todoData.findIndex(el => el.id === id)
			let oldItem = todoData[idxEdit]
			let newItem = { ...oldItem, isEditing: !oldItem.isEditing }
			let newArray = todoData.with([idxEdit], newItem)
			return { todoData: newArray }
		})
	}

	onSaveEdited = (id, label) => {

		this.setState(({ todoData }) => {
			const idxSave = todoData.findIndex(el => el.id === id)
			let oldItem = todoData[idxSave]
			let newItem = { ...oldItem, label: label, isEditing: !oldItem.isEditing }
			let newArray = todoData.with([idxSave], newItem)
			return { todoData: newArray }
		})
	}

	render() {
		const leftCount = this.state.todoData.filter(el => !el.done).length

		return (
			<section className='todoapp'>
				<header className='header'>
					<h1>todos</h1>
					<Newtaskform addItem={this.addItem} />
				</header>
				<section className='main'>
					<ToDoList
						todos={this.state.todoData}
						filter={this.state.filter}
						setFilter={this.setFilter}
						onDeleted={this.deleteItem}
						onToggleDone={this.onToggleDone}
						dateOfCreate={this.state.dateOfCreate}
						onEditLabel={this.onEditLabel}
						isEditing={this.state.isEditing}
						onSaveEdited={this.onSaveEdited}
					/>
					<Footer
						leftCount={leftCount}
						setFilter={this.setFilter}
						filter={this.state.filter}
						clearCompleted={this.clearCompleted}
					/>
				</section>
			</section>
		)
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
