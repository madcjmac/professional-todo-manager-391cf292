import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Build an amazing React application",
      completed: true,
      priority: "high",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      text: "Implement user authentication",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString()
    }
  ]);
  
  const addTodo = (text, priority = 'medium') => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdAt: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };
  
  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};