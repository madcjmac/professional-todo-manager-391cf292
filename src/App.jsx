import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <TodoHeader />
          <div className="max-w-2xl mx-auto">
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;