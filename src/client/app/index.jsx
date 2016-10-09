import React from 'react';
import CreateTask from './components/CreateTask.jsx'
import TaskList from './components/tasks/TaskList.jsx'
import ReactDOM from 'react-dom';
import {styleMaps, Tabs, Tab} from 'react-bootstrap';


class Publisher extends React.Component {
  handleTabSelect(selectedTab){
    if (selectedTab == 2){
      this.refs.taskList.refreshList();
    }
  }
  render() {
    return (
      <Tabs id="main-menu" onSelect={this.handleTabSelect.bind(this)}>
        <Tab eventKey={1} title="Crear Tarea">
          <CreateTask />
        </Tab>
        <Tab eventKey={2}  title="Ver Tareas">
          <TaskList ref="taskList" />
        </Tab>
      </Tabs>
    )
  }
}
ReactDOM.render(<Publisher/>, document.getElementById('app'));
