import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Learning } from './pages/Learning';
import { Authentiation } from './pages/Authentication';
import { ChangePassword } from './pages/ChangePassword';
import { ToastContainer } from 'react-toastify';
import { ResetPassword } from './pages/ResetPassword';
import { UserContext } from './context/UserContext';
import Profile from './pages/Profile';
import Course from './pages/Course';
import { Learnings } from './pages/Learnings';
import Courses from './pages/Courses';
import { NotFound } from './pages/NotFound';
import PageLayout from './layout/PageLayout';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './pages/Home';


function App() {
  const [user, setUser] = useState<object>({});
  const [isLoggedIn, setIsLoggedIn] = useState<string>("Login");

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
        <BrowserRouter>
          <Routes>
            <Route element={<PageLayout/>}>
              <Route path='/course/:id' element={<Course/>}/>
              <Route path='/courses' element={<Courses/>}/>
              <Route path='/learning/:course_id/:user_id' element={<Learning/>}/>
              <Route path='/learnings/:code' element={<Learnings/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/user/profile/:code' element={<Profile/>}/>
            </Route>
            <Route path='/authentication' element={<Authentiation/>}/>
            <Route path='/authentication/change_password/:email/:code' element={<ChangePassword/>}/>
            <Route path='/authentication/reset_password' element={<ResetPassword/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
