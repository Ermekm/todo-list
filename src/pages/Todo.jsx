import React, { useEffect, useMemo, useState } from 'react'
import cl from './Todo.module.css'
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import Service from '../API/Service';

const Todo = () => {
    const [todo, setTodo] = useState({
        id: '',
        title: '',
        description: '',
        date: {
            seconds: ''
        },
        files: '',
    });

    const { id } = useParams();

    useEffect(() => {
        Service.getSingle(id)
            .then((data) => {
                setTodo(data)
            })
            .catch((err) => {
                alert(err)
            })
    }, []);

    const date = useMemo(() => {
        if (todo.date.seconds) {
            return dayjs.unix(todo.date.seconds).format('YYYY-MM-DD')
        }
        return ''
    }, [todo.date])

    const setDate = (date) => {
        let newDate = '';
        if (date) {
            newDate = {
                seconds: date / 1000
            }
        }
        setTodo({ ...todo, date: newDate })
    }

    const updateTodo = async () => {
        Service.updateSingle(id, todo)
            .catch((err) => {
                alert(err)
            })
    }

    const handleFileInput = async (e) => {
        const files = e.target.files
        Service.postFiles(files, id)
            .then((filesData) => {
                setTodo({ ...todo, files: [...todo.files, ...filesData] })
            })
            .catch((err) => {
                alert(err)
            })
        e.target.value = ''
    }

    const deleteFile = (e, name) => {
        e.preventDefault()
        const updatedFiles = todo.files.filter((file) => file.name !== name)
        const fileToDelete = todo.files.find((file) => file.name === name);

        Service.deleteFile(id, fileToDelete)
            .then(() => {
                setTodo({ ...todo, files: updatedFiles })
            })
            .catch((err) => {
                alert(err)
            })
    }


    return (
        <div className='wrapper'>
            <form className={cl.todo}>
                <label
                    className={cl.todo__label}
                >Заголовок</label>
                <input
                    className={cl.todo__input}
                    type="text"
                    value={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                    onBlur={updateTodo}
                />
                <label
                    className={cl.todo__label}
                >Описание</label>
                <textarea
                    className={cl.todo__input}
                    rows="5"
                    value={todo.description}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    onBlur={updateTodo}
                />
                <label
                    className={cl.todo__label}
                >Дата выполнения</label>
                <input
                    className={cl.todo__input}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.valueAsNumber)}
                    onBlur={updateTodo}
                />
                <div className={cl.todo__fileList}>
                    {todo.files && todo.files.map((file, index) => {
                        return (
                            <a key={index} href={file.url} className={cl.todo__file}>
                                <div className={cl.todo__fileTitle}>{file.name}</div>
                                <button className='btn' onClick={(e) => deleteFile(e, file.name)}>
                                    <span className='material-icons'>
                                        clear
                                    </span>
                                </button>
                            </a>
                        )
                    })}
                </div>
                <label
                    className={[cl.todo__fileLabel, 'btn'].join(' ')}
                    htmlFor="file">Прикрепить файл</label>
                <input
                    className={cl.todo__fileInput}
                    id="file"
                    type="file"
                    multiple
                    onChange={handleFileInput}
                />
            </form>
        </div>
    )
}

export default Todo