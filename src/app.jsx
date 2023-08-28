import React from 'react';
import './app.scss'
import ToDo from './components/todo/todo.jsx';
import Settings from './context/Setting.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Settings>
        <ToDo />
      </Settings>
    );
  }
}
