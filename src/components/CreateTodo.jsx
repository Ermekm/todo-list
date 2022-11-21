import React, { useState } from 'react'
import cl from './CreateTodo.module.css'

const CreateTodo = ({ createTodo }) => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        files: [],
        date: '',
        isDone: false,
    })
    const [fileLabel, setFileLabel] = useState('Прикрепить файл');

    const addTodo = (e) => {
        e.preventDefault()

        const newTodo = {
            ...todo,
            id: Date.now()
        }
        createTodo(newTodo)
        clearFields();
    }

    const clearFields = () => {
        todo.title = '';
        todo.description = '';
        todo.files = [];
        todo.date = '';
        todo.isDone = false;
    }

    const handleFileInput = (e) => {
        console.log('file input asdf')
        const files = e.target.files
        setTodo({ ...todo, files: files })
        if (files.length === 1) {
            setFileLabel(files[0].name)
        } else {
            setFileLabel('Выбрано файлов: ' + files.length)
        }
    }


    return (
        <form className={cl.todoForm} onSubmit={addTodo}>
            <label className={cl.todoForm__label}>Заголовок</label>
            <input
                required
                className={cl.todoForm__input}
                type="text"
                value={todo.title}
                onChange={e => setTodo({ ...todo, title: e.target.value })}
            />
            <label className={cl.todoForm__label}>Описание</label>
            <textarea
                className={cl.todoForm__textarea}
                rows="5"
                value={todo.description}
                onChange={e => setTodo({ ...todo, description: e.target.value })}
            />
            <label className={cl.todoForm__label}>Добавить дату выполнения</label>
            <input
                className={cl.todoForm__input}
                type="date"
                value={todo.date}
                onChange={e => setTodo({ ...todo, date: e.target.value })}
            />
            <label htmlFor="file" className={[cl.todoForm__label, cl.todoForm__fileLabel, 'btn'].join(' ')}>{fileLabel}</label>
            <input
                id="file"
                className={cl.todoForm__file}
                type="file"
                multiple
                onChange={handleFileInput}
            />
            <div className={cl.todoForm__btnGroup}>
                <button className={[cl.todoForm__cancel, 'btn'].join(' ')}>Отменить</button>
                <button
                    type="submit"
                    className={[cl.todoForm__submit, 'btn'].join(' ')}
                >Добавить</button>
            </div>
        </form>
    )
}

export default CreateTodo
