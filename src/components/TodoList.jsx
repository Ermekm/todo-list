import React from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'

const TodoList = ({ todos, removeTodo, changeIsDone }) => {

    if (!todos.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                Список пуст. Добавьте задачу
            </h1>
        )
    }

    return (
        <div className='wrapper' >
            {todos.map(todo => {
                return (
                    <TodoItem todo={todo} key={todo.id} removeTodo={removeTodo} changeIsDone={changeIsDone}></TodoItem>
                )
            })
            }
        </div >
    )
}

export default TodoList