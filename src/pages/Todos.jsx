import { useMemo, useState, useEffect } from 'react';
import './Todos.css'
import Service from '../API/Service';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import MyModal from '../components/UI/MyModal';

function Todos() {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [todos, setTodos] = useState([])

    useEffect(() => {
        Service.getAll()
            .then((data) => {
                setTodos(data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => id !== todo.id))
    }

    const changeIsDone = (id) => {
        setTodos(state => {
            const newState = state.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: !todo.isDone }
                }
                return todo
            })
            return newState
        })
    }

    const sortedTodos = useMemo(() => {
        return todos.sort(todo => todo.isDone ? 1 : -1)
    }, [todos])

    const createTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
        setIsModalVisible(false)
    }

    return (
        <div className="todos">
            <TodoList todos={sortedTodos} removeTodo={removeTodo} changeIsDone={changeIsDone}></TodoList>
            <div
                className='todos__create-todo btn'
                onClick={() => { setIsModalVisible(true) }}
            >
                <span className="material-icons add">
                    add
                </span>
            </div>
            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
                <CreateTodo createTodo={createTodo} setIsModalVisible={setIsModalVisible}></CreateTodo>
            </MyModal>
        </div>
    );
}

export default Todos;
