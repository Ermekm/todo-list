import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './TodoItem.css'
import dayjs from 'dayjs'
import Service from '../Service'

const TodoItem = ({ todo, removeTodo, changeIsDone }) => {
    const [isCheckHover, setIsCheckHover] = useState(false)
    const navigate = useNavigate()

    const expired = useMemo(() => {
        if (todo.date) {
            return Date.now() > new Date(todo.date.seconds * 1000)
        }
        return false
    }, [todo.date])

    const handleRemove = (e, id) => {
        e.stopPropagation();

        Service.deleteSingle(id, todo.files)
            .then(() => {
                removeTodo(id);
            })
            .catch((err) => {
                alert(err)
            })
    }

    const handleCheckbox = (e, id) => {
        e.stopPropagation()

        const newData = { ...todo, isDone: !todo.isDone }
        Service.updateSingle(id, newData)
            .then(() => {
                changeIsDone(id)
            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <div className={['todo', todo.isDone ? 'todo-checked' : ''].join(' ')} onClick={() => navigate('/todo/' + todo.id)}>
            <span
                className='todo__checkbox'
                onMouseEnter={() => setIsCheckHover(true)}
                onMouseLeave={() => setIsCheckHover(false)}
                onClick={(e) => handleCheckbox(e, todo.id)}
            >
                <span
                    className="material-icons">
                    {isCheckHover || todo.isDone ? 'task_alt' : 'radio_button_unchecked'}
                </span>
            </span>
            <div className={['todo__title', todo.isDone ? 'todo__title-done' : ''].join(' ')}>
                {todo.title}
            </div>
            <div className={['todo__date', expired ? 'todo__date-expired' : ''].join(' ')}>
                {todo.date && (expired ? "Просрочена " : '') + dayjs.unix(todo.date.seconds).format('DD/MM/YYYY')}
            </div>
            <button className='todo__delete btn' onClick={(e) => handleRemove(e, todo.id)}>Удалить</button>
        </div>
    )
}

export default TodoItem