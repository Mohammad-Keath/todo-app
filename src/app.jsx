import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.scss'
import ToDo from './components/todo/todo.jsx';
import SettingsForm from './components/SettingsForm/settingsForm';
import Settings from './context/Setting.jsx';
import Header from './components/Header/Header';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Settings>
        <Header/>
        <Routes>
        <Route path='/' element={<ToDo />}/>
        <Route path='/setting' element={<SettingsForm/>}/>
        </Routes>
      </Settings>
      </BrowserRouter>
    );
  }
}
