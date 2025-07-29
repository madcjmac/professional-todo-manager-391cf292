// contexts/TaskContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface TaskState {
  tasks: Task[];
  categories: Category[];
  filter: {
    priority: string;
    category: string;
    status: string;
    search: string;
  };
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_FILTER'; payload: Partial<TaskState['filter']> }
  | { type: 'ADD_SUBTASK'; payload: { taskId: string; subtask: Subtask } }
  | { type: 'TOGGLE_SUBTASK'; payload: { taskId: string; subtaskId: string } };

const initialState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Complete Project Proposal',
      description: 'Finalize the Q1 project proposal with budget estimates',
      priority: 'high',
      category: 'work',
      dueDate: '2024-01-15',
      completed: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      tags: ['proposal', 'urgent'],
      subtasks: [
        { id: 's1', title: 'Research requirements', completed: true },
        { id: 's2', title: 'Draft initial proposal', completed: false },
        { id: 's3', title: 'Review with team', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Grocery Shopping',
      description: 'Buy ingredients for weekend dinner party',
      priority: 'medium',
      category: 'personal',
      dueDate: '2024-01-12',
      completed: false,
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
      tags: ['shopping', 'weekend'],
      subtasks: []
    }
  ],
  categories: [
    { id: 'work', name: 'Work', color: 'bg-blue-500', icon: '💼' },
    { id: 'personal', name: 'Personal', color: 'bg-green-500', icon: '🏠' },
    { id: 'health', name: 'Health', color: 'bg-red-500', icon: '❤️' },
    { id: 'learning', name: 'Learning', color: 'bg-purple-500', icon: '📚' }
  ],
  filter: {
    priority: '',
    category: '',
    status: '',
    search: ''
  }
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
            : task
        )
      };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    
    case 'UPDATE_FILTER':
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      };
    
    case 'ADD_SUBTASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, subtasks: [...task.subtasks, action.payload.subtask] }
            : task
        )
      };
    
    case 'TOGGLE_SUBTASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map(subtask =>
                  subtask.id === action.payload.subtaskId
                    ? { ...subtask, completed: !subtask.completed }
                    : subtask
                )
              }
            : task
        )
      };
    
    default:
      return state;
  }
}

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | null>(null);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};
