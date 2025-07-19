import React from 'react';

const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className={`todo ${todo.isCompleted ? 'completed' : ''}`}
      style={todo.isCompleted ? { textDecoration: 'line-through', opacity: 0.6 } : {}}
    >
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div>
        <button
          className='complete'
          onClick={() => completeTodo(todo.id)}
        >
          {todo.isCompleted ? 'Desfazer' : 'Completar'}
        </button>
        <button className='remove' onClick={() => removeTodo(todo.id)}>X</button>
      </div>
    </div>
  );
};

export default Todo;