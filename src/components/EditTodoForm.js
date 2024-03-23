import React, {useState} from 'react'

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    console.log('inside');
    editTodo(value, task.id);
  };
  
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={setValue(e.targe.value)} className="todo-input" placeholder='Update task' />
      <button type="submit" className='todo-btn'>Update Task</button>
      <h3>{error}</h3>
  </form>
  )
}