class PostsManager {

  static getPost(postId){
    //DANA
    let promise = new Promise(
      function(resolve, reject){
        fetch('http://localhost:3000/posts/' + postId, {
          method: 'get',
          headers: new Headers({
            'Content-Type':'application/json'
          })
        }).then(function(response){
          return response.json();
        }).then(function(json){
          resolve(json);
        }).catch(function(error){
          reject(error);
        })
    });
    return promise;
  }

  static createPost(post){
    let promise = new Promise(
      function (resolve, reject){
        fetch('http://localhost:3000/posts', {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            post: post
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
  static updatePost(postId, post){
    let promise = new Promise(
      function(resolve, reject){
        fetch('http://localhost:3000/posts/' + postId, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            post: post
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
}

module.exports = PostsManager;
