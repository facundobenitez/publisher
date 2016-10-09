import React from 'react';
import {Form, FormGroup, FormControl, ControlLabel,
        Checkbox, Image, Table, ButtonToolbar,Button}  from 'react-bootstrap';
import TaskManager from '../../common/TaskManager.js';
import PostManager from '../../common/PostManager.js';
import EditPostPopup from '../posts/EditPostPopup.jsx';

class TaskList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingEditPostPopup: false,
      isDeleting: false,
      tasks: [],
      selectedTasks:[],
      popupAction: null,
      showingEditPostPopup:false
    }
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList(){
    let _this = this;
    TaskManager.getTasks().then(
      function(json){
        _this.setState({
          tasks: json
        })
      }).catch(function(error){
        alert(error);
      })
  }
  handleSelectClick(e){
    let selectedTask = e.target.getAttribute('data-task');
    let selectedTasks = this.state.selectedTasks;
    if (e.target.checked){
      if (selectedTasks.indexOf(selectedTask) < 0){
        selectedTasks.push(selectedTask);
      }
    }else{
      let index = selectedTasks.indexOf(selectedTask);
      selectedTasks.splice(index, 1);
    }
    this.setState({
      selectedTasks: selectedTasks
    });
  }
  handleDeleteTaskClick(e){
    let taskId = e.target.getAttribute('data-task');
    this._deleteTask(taskId);
  }

  _deleteTask(taskId){
    let _this = this;
    TaskManager.deleteTask(taskId).then(function(response){
      let index = _this.state.tasks.findIndex(
        function(element){
          return element.id === parseInt(taskId);
        }
      );
      _this.state.tasks.splice(index, 1);
      index = _this.state.selectedTasks.indexOf(taskId);
      _this.state.selectedTasks.splice(index, 1);
      _this.setState({
        isDeleting: false,
        tasks: _this.state.tasks,
        selectedTasks: _this.state.selectedTasks
      })
    }).catch(function(error){
      _this.setState({
        isDeleting: false
      });
      alert(error);
    });
  }

  handleDeleteSelectedClick(e){
    let _this = this;
    let selectedTasks = this.state.selectedTasks;

    this.setState({
      isDeleting: true
    })
    for (let taskId of selectedTasks){
      this._deleteTask(taskId);
    }
  }

  handlePostClick(postId){
    let selectedPost = null;
    let _this = this;
    PostManager.getPost(postId).then(function(post){
      _this.setState({
        showingEditPostPopup:true,
        popupAction: 'edit',
        post: post
      })
    }).catch(function(error){
      alert(error);
    });
  }

  handleCloseEditPopup(e){
    this.setState({showingEditPostPopup:false});
  }


  handleUpdatePost(post){
  }

  render(){
    let tasks = this.state.tasks
    let _this = this;
    return(
      <div>
        <EditPostPopup
          show={this.state.showingEditPostPopup}
          onHide={this.handleCloseEditPopup.bind(this)}
          onUpdate={this.handleUpdatePost.bind(this)}
          action={this.state.popupAction}
          post={this.state.post}
        />
        <ButtonToolbar>
          <Button
            disabled={
              this.state.selectedTasks.length === 0 ||
              this.state.isDeleting
              }
            bsStyle='danger'
            onClick={this.handleDeleteSelectedClick.bind(this)}>
            Borrar
          </Button>
        </ButtonToolbar>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Grupo</th>
              <th>Post</th>
              <th>Cada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{
            tasks.map(function(task, i){
            return <tr key={i}>
              <td>
                <Checkbox
                  key={i}
                  onClick={_this.handleSelectClick.bind(_this)}
                  data-task={task.id}
                />
              </td>
              <td>{task.group_id}</td>
              <td>
                <Button bsStyle='link' onClick={_this.handlePostClick.bind(_this, task.post_id)}>
                  {task.post_id}
                </Button>
              </td>
              <td>{task.frecuency_value}</td>
              <td>
                <Button
                  data-task={task.id}
                  onClick={_this.handleDeleteTaskClick.bind(_this)}
                  bsSize='xsmall'
                  bsStyle='danger'>
                  Borrar
                </Button>
              </td>
            </tr>
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

module.exports = TaskList;
