import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5001/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('http://localhost:5001/api/todos', { text: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5001/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    const response = await axios.put(`http://localhost:5001/api/todos/${id}`, { completed: !todo.completed });
    setTodos(todos.map(todo => todo.id === id ? response.data : todo));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React To-Do App</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
