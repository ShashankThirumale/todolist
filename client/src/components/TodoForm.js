import React, {useState, useEffect} from 'react'

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState('');
  const [submit, setStubmit] = useState(false);

  const validate = (value) => {
    let errors = '';
    if (value < 1 || value.charAt(0) === ' ') {
      errors = 'Must start with a alphanumeric and can not be empty';
    }
    return errors;
  }
    const handleSubmit = (e) => {
      // prevent default action
      e.preventDefault();
      setErrors(validate(value));
      setStubmit(true);
    };
  const finishSubmit = () => {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue('');
      setErrors('')
      setStubmit(false);
    };
  
    useEffect(() => {
      if (errors.length === 0 && submit) {
        finishSubmit();
      }
    }, [errors]);
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <h4>{errors}</h4>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
        onClick={(e) => setErrors('Must start with a alphanumeric and can not be empty')} className="todo-input" placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}