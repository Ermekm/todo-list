import { useMemo, useState } from 'react';
import './App.css';

import CreateTodo from './components/CreateTodo';
import Header from "./components/Header"
import TodoList from './components/TodoList';
import MyModal from './components/UI/MyModal';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Сделать todo',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      time: Date.now(),
      isDone: false,
      files: []
    }
  ])

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
    <div className="App">
      <Header setIsModalVisible={setIsModalVisible}></Header>
      <TodoList todos={sortedTodos} removeTodo={removeTodo} changeIsDone={changeIsDone}></TodoList>
      <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        <CreateTodo createTodo={createTodo}></CreateTodo>
      </MyModal>
    </div>
  );
}

export default App;
