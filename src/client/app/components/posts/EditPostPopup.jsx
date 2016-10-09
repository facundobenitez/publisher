var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

import PostsManager from '../../common/PostManager.js'
import EditPost from './EditPost.jsx'

class EditPostPopupA extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      action: 'create',
      post: props.post
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      show: props.show,
      action: props.action,
      post: props.post
    });
  }
  handleCreate(post){
    this.setState({
      show: false
    });
    this.props.onCreate(post);
  }
  handleUpdate(post){
    this.setState({
      show: false
    })
    this.props.onUpdate(post);
  }
  handleSaveClick(e){
    e.preventDefault();
    if (this.state.action ==='create'){
      this._createPost();
    }else{
      this._updatePost();
    }
  }
  _updatePost(){
    let _this = this;
    this.setState({
      isSaving: true
    })
    PostsManager.updatePost(this.props.post.id, this.state.newPost)
      .then(function(json){
        //DANA
        _this.setState({
          isSaving: false
        })
        _this.handleUpdate(json);
      }).catch(function(error){
        alert(error);
      });
  }

  _createPost(){
    let _this = this;
    this.setState({
      isSaving: true
    });
    PostsManager.createPost(this.state.newPost)
    .then(function(json){
      _this.handleCreate(json);
      _this.setState({
        isSaving: false
      });
    }).catch(function(error){
      alert('error');
    });
  }

  handleOnPostChange(post){
    this.setState({
      newPost: post
    });
  }

  handleCloseClick(e){
    this.setState({
      show: false
    });
  }

  render(){
    let isSaving = this.state.isSaving;
    let isCreate = this.state.action === 'create';
    let _this = this;
    return(
      <Modal
        show={this.state.show}
        onHide={this.props.onHide}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Crear Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPost
            post={_this.state.post}
            onChange={this.handleOnPostChange.bind(this)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseClick.bind(this)}>Cerrar</Button>
          <Button
            disabled={isSaving}
            bsStyle='primary' onClick={close}
            onClick={this.handleSaveClick.bind(this)}
          >
          {isSaving ? 'Guardando ...' : isCreate? 'Crear' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = EditPostPopupA;
