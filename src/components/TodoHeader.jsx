import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const TodoHeader = () => {
  const { todos } = useContext(TodoContext);
  
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        🚀 Professional Todo App
      </h1>
      <div className="flex justify-center space-x-8 text-lg">
        <div className="bg-white px-4 py-2 rounded-lg shadow">
          <span className="text-blue-600 font-semibold">{totalTodos}</span>
          <span className="text-gray-600 ml-1">Total</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow">
          <span className="text-green-600 font-semibold">{completedTodos}</span>
          <span className="text-gray-600 ml-1">Completed</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow">
          <span className="text-orange-600 font-semibold">{totalTodos - completedTodos}</span>
          <span className="text-gray-600 ml-1">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default TodoHeader;