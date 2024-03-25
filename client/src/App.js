import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import { TodoWrapperLocalStorage } from './components/TodoWrapperLocalStorage';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react'


const App = () => {
  const [data, setData] = useState('');
  const handleDataChange = (data) => {
    setData({ data });
  };
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login onDataChange={handleDataChange}/>} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/TodoList' element={<TodoWrapper data={data} />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;