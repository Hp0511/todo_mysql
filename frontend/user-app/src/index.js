import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './Menu.jsx';
import DefaultTaskBar from './DefaultTaskBar.jsx';
import TaskManager from './TaskManager.jsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('menu')).render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('toolBar')).render(
  <React.StrictMode>
    <DefaultTaskBar/>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('task')).render(
  <React.StrictMode>
    <TaskManager/>
  </React.StrictMode>
)


