import React from 'react';
import { Route, Routes } from "react-router-dom";
import { TaskProvider } from './context/TaskContext';
import HomePage from './pages/HomePage';
import Tasks from './pages/Tasks';
import CallbackPage from './auth/CallbackPage';
import './index.css'
//import Test from './components/test';


const App: React.FC = () => {

  return (
    <>
      <TaskProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path="/tasks"
            element={<Tasks />}
          />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
        {/* <Test/> */}
      </TaskProvider>
    </>
  );
}

export default App
