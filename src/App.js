

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      if (isEditing) {
        const updatedTodos = todos.map((todo, index) =>
          index === currentTodo ? { ...todo, text: task } : todo
        );
        setTodos(updatedTodos);
        setIsEditing(false);
        setCurrentTodo(null);
      } else {
        setTodos([...todos, { text: task, completed: false }]);
      }
      setTask('');
    }
  };

  const handleEditTodo = (index) => {
    setTask(todos[index].text);
    setIsEditing(true);
    setCurrentTodo(index);
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTodo}>
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => handleCompleteTodo(index)}>{todo.text}</span>
              <div className="actions">
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleRemoveTodo(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
