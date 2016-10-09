import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import TaskManager from '../common/TaskManager.js'
import PostList from './posts/PostList.jsx'
import SelectGroups from './groups/SelectGroups.jsx'
import Frecuency from './schedule/Frecuency.jsx'

class CreateTask extends React.Component {
  constructor(props){
    super(props);
  }
  handleOnSaveClick(event){
    TaskManager.createTasks(this.refs.posts.state.selectedPosts,
                            this.refs.groups.state.selectedGroups,
                            this.refs.frecuency.state.hours);
  }
  render(){
    return(
      <Tabs id="create-tasks">
        <Tab eventKey={1} title="Posts">
          <PostList ref="posts"/>
        </Tab>
        <Tab eventKey={2} title="Grupos">
          <SelectGroups ref="groups"/>
        </Tab>
        <Tab eventKey={3} title="Frecuencia">
          <Frecuency ref="frecuency"
            onSaveClick={this.handleOnSaveClick.bind(this)} />
        </Tab>
      </Tabs>
    )
  }
}
module.exports = CreateTask;
