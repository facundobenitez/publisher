class TaskManager {
  constructor(){
    this.serverUrl = '';
  }
  static createTasks(posts, groups, frecuency_value){
    let body = {
      posts: posts,
      groups: groups,
      frecuency_value: frecuency_value
    }
    fetch('http://localhost:3000/tasks/create_tasks', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(
        body
      )
    }).then(function(response){
      return response.json();
    }).then(function(json){
      console.log('Saved new task');
    }).catch(function(error){
      alert(error);
    });
  }
  static getTasks(){
    let promise = new Promise(
      function (resolve, reject){
        fetch('http://localhost:3000/tasks', {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function(response){
          return response.json();
        }).then(function(json){
          resolve(json);
        }).catch(function(error){
          reject(error);
        });
      }
    )
    return promise;
  }
  static deleteTask(taskId){
    let promise = new Promise(
      function (resolve, reject){
        fetch('http://localhost:3000/tasks/' + taskId, {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function(response){
          resolve(response);
        }).catch(function(error){
          reject(error);
        });
      }
    )
    return promise;
  }
}

module.exports = TaskManager;
