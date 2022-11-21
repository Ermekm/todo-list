import React, { useState } from 'react'
import './TodoItem.css'

const TodoItem = ({ todo, removeTodo, changeIsDone }) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <div className='todo'>
            <span
                className='todo__checkbox'
                onMouseEnter={() => setIsChecked(true)}
                onMouseLeave={() => setIsChecked(false)}
                onClick={() => changeIsDone(todo.id)}
            >
                <span
                    className="material-icons">
                    {isChecked || todo.isDone ? 'task_alt' : 'radio_button_unchecked'}
                </span>
            </span>
            <div className={['todo__title', todo.isDone ? 'todo__title-done' : ''].join(' ')}>
                {todo.title}
            </div>
            <button className='todo__delete btn' onClick={() => removeTodo(todo.id)}>Удалить</button>
        </div>
    )
}

export default TodoItem