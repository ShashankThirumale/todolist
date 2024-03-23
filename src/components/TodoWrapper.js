import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import Axios from 'axios'
import { useLocation } from "react-router-dom";

export const TodoWrapper = (props) => {
  const client = Axios.create({
    baseURL: "http://localhost:3001"
  })
  const [todos, setTodos] = useState([]);
  const location = useLocation();
  
  const addTodoR = (id, task, complete) => {
    setTodos([...todos, { id: id, task: task, completed: complete, isEditing: false }]);
  }
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await client.post('/render',{
        email: location.state.email,
      })
      setTodos(response.data);
    }
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    const id = uuidv4();
    setTodos([
      ...todos,
      { id: id, task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);

    Axios.post('http://localhost:3001/create', {
      email: location.state.email,
      taskId: id,
      task: todo
    }).then(() => {
      console.log("Success");
    });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))

    Axios.post('http://localhost:3001/delete', {
      taskId: id
    }).then(() => {
      console.log("Success");
    })
  };

  const toggleComplete = (id) => {
    let complete;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: complete = !todo.completed } : todo
      )
    );

    Axios.post('http://localhost:3001/update', {
      taskId: id,
      completed: complete
    }).then(() => {
      console.log("Success");
    })
  }

  const editTodo = (id) => {
    console.log('inside edit todo')
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
   
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );

    Axios.post('http://localhost:3001/updateTask', {
      taskId: id,
      task: task
    }).then(() => {
      console.log("Success");
    })
  };
  
return (
  <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
    <TodoForm addTodo={addTodo} />
    {console.log(todos)}
    {todos.map((todo, index) => (
          
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
            
        ))}
         
    </div>
);
};