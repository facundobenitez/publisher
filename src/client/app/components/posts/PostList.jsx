import React from 'react';
import {Form, FormGroup, FormControl, ControlLabel,
        Checkbox, Image, Table, ButtonToolbar,Button}  from 'react-bootstrap';
import EditPostPopup from './EditPostPopup.jsx'
import PostManager from '../../common/PostManager.js'

class PostList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingEditPostPopup: false,
      isDeleting: false,
      posts: [],
      selectedPosts:[],
      popupAction: 'create'
    }
  }
  componentDidMount() {
    let _this = this;
    fetch('http://localhost:3000/posts', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function(response){
      return response.json();
    }).then(function(json){
      _this.setState({
        posts: json
      })
    }).catch(function(error){
      alert(error);
    });
  }
  handleSelectClick(e){
    let selectedPost = e.target.getAttribute('data-post');
    let selectedPosts = this.state.selectedPosts;
    if (e.target.checked){
      if (selectedPosts.indexOf(selectedPost) < 0){
        selectedPosts.push(selectedPost);
      }
    }else{
      let index = selectedPosts.indexOf(selectedPost);
      selectedPosts.splice(index, 1);
    }
    this.setState({
      selectedPosts: selectedPosts
    });
  }
  handleDeletePostClick(e){
    let postId = e.target.getAttribute('data-post');
    this._deletePost(postId);
  }
  _deletePost(postId){
    let _this = this;
    fetch('http://localhost:3000/posts/' + postId , {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function(response){

      let index = _this.state.posts.findIndex(
        function(element){
          return element.id === parseInt(postId);
        }
      );
      _this.state.posts.splice(index, 1);

      index = _this.state.selectedPosts.indexOf(postId);
      _this.state.selectedPosts.splice(index, 1);

      _this.setState({
        isDeleting: false,
        posts: _this.state.posts,
        selectedPosts: _this.state.selectedPosts
      })
    }).catch(function(error){
      _this.setState({
        isDeleting: false
      });
      alert(error);
    });
  }

  handleDeleteClick(e){
    let _this = this;
    let selectedPosts = this.state.selectedPosts;

    this.setState({
      isDeleting: true
    })
    for (let postId of selectedPosts){
      _this._deletePost(postId);
    }
  }
  handleCreateClick(e){
    this.setState({showingEditPostPopup:true, popupAction: 'create'});
  }
  handleEditClick(e){
    let postId = e.target.getAttribute('data-post');
    let index = this.state.posts.findIndex(
      function(element){
        return element.id === parseInt(postId);
      }
    );
    let selectedPost = this.state.posts[index];
    this.setState({
      showingEditPostPopup:true,
      popupAction: 'edit',
      post: selectedPost
    })
  }
  handleCloseEditPopup(e){
    this.setState({showingEditPostPopup:false});
  }
  handleCreatePost(post){
    this.state.posts.push(post);
    this.setState({
      showingEditPostPopup: false,
      posts: this.state.posts
    });
  }
  handleUpdatePost(post){
    let index = this.state.posts.findIndex(
      function(element){
        return element.id === parseInt(post.id);
      }
    );
    this.state.posts[index] = post;
    this.setState({
      showingEditPostPopup: false,
      posts: this.state.posts
    });
  }
  render(){
    let posts = this.state.posts
    let _this = this;
    return(
      <div>
        <EditPostPopup
          show={this.state.showingEditPostPopup}
          onHide={this.handleCloseEditPopup.bind(this)}
          onCreate={this.handleCreatePost.bind(this)}
          onUpdate={this.handleUpdatePost.bind(this)}
          action={this.state.popupAction}
          post={this.state.post}
        />
        <ButtonToolbar>
          <Button
            disabled={
              this.state.selectedPosts.length === 0 ||
              this.state.isDeleting
              }
            bsStyle='danger'
            onClick={this.handleDeleteClick.bind(this)}>
            Borrar
          </Button>
          <Button bsStyle='primary' onClick={this.handleCreateClick.bind(this)}>
            Crear
          </Button>
        </ButtonToolbar>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Titulo</th>
              <th>Cuerpo</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(function(post, i){
            return <tr key={i}>
              <td>
                <Checkbox
                  key={i}
                  onClick={_this.handleSelectClick.bind(_this)}
                  data-post={post.id}
                />
              </td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td><Image className='post-small-image' src = {'http://localhost:3000' + post.small_image_url}/></td>
              <td>
                <Button
                  data-post={post.id}
                  onClick={_this.handleEditClick.bind(_this)}
                  bsSize='xsmall'
                  bsStyle='primary'>
                  Editar
                </Button>
                <Button
                  data-post={post.id}
                  onClick={_this.handleDeletePostClick.bind(_this)}
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

module.exports = PostList;
