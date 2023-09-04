import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.scss'
import ToDo from './components/todo/todo.jsx';
import SettingsForm from './components/SettingsForm/settingsForm';
import Settings from './context/Setting.jsx';
import Header from './components/Header/Header';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/Signup';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Settings>
        <Header/>
        <Routes>
          <Route path='signup' element={<Signup/>}/>
          <Route path='signin' element={<Signin/>}/>
          <Route path='/' element={<ToDo />}/>
          <Route path='/setting' element={<SettingsForm/>}/>
        </Routes>
      </Settings>
      </BrowserRouter>
    );
  }
}
