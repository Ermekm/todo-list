import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Todos from './pages/Todos';
import Todo from './pages/Todo'
import Header from './components/Header';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Todos />}>
          </Route>
          <Route path='todo/:id' element={<Todo />}>
          </Route>
          <Route path='*' element={<Navigate to="/" />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
