import React, { useState } from 'react'
import cl from './CreateTodo.module.css'
import { v4 } from 'uuid'
import Service from '../API/Service'

const CreateTodo = ({ createTodo }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [fileList, setFileList] = useState([])

    const addTodo = async (e) => {
        e.preventDefault()

        const newTodo = {
            title: title,
            description: description,
            files: [],
            date: date,
            isDone: false,
            id: null
        }
        const files = fileList.map((file) => file.body)

        Service.postSingle(files, newTodo)
            .then((data) => {
                createTodo(data);
                clearFields()
            })
            .catch((err) => {
                alert(err)
            })

    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    const clearFields = () => {
        setTitle('')
        setDescription('')
        setDate('')
    }

    const handleFileInput = (e) => {
        const files = e.target.files
        if (files.length) {
            Array.prototype.map.call(files, (file) => {
                setFileList(prevState => {
                    return [...prevState, { id: v4(), body: file }]
                })
            })
            e.target.value = ''
        }
    }

    const deleteFile = (e, id) => {
        e.preventDefault();
        setFileList((prevState) => {
            return prevState.filter((file) => file.id !== id)
        })
    }


    return (
        <form className={cl.todoForm} onSubmit={addTodo}>
            <label className={cl.todoForm__label}>Заголовок</label>
            <input
                required
                className={cl.todoForm__input}
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <label className={cl.todoForm__label}>Описание</label>
            <textarea
                className={cl.todoForm__textarea}
                rows="5"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <label className={cl.todoForm__label}>Добавить дату выполнения</label>
            <input
                className={cl.todoForm__input}
                type="date"
                value={date}
                onChange={e => changeDate(e)}
            />
            <div className={cl.todoForm__fileList}>
                {fileList.map((file) => {
                    return (
                        <div key={file.id} className={cl.todoForm__file}>
                            <div className={cl.todoForm__fileTitle}>
                                {file.body.name}
                            </div>
                            <button className='btn' onClick={(e) => deleteFile(e, file.id)}>
                                <span className='material-icons'>
                                    clear
                                </span>
                            </button>
                        </div>
                    )
                })}
            </div>
            <label htmlFor="file" className={[cl.todoForm__label, cl.todoForm__fileLabel, 'btn'].join(' ')}>Прикрепить файл</label>
            <input
                id="file"
                className={cl.todoForm__fileInput}
                type="file"
                multiple
                onChange={(e) => handleFileInput(e)}
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
