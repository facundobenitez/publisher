import ImageFileSelector from "react-image-select-component";
import React from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel,
  Grid, Row, Col, Image} from 'react-bootstrap';

class EditPost extends React.Component {
  constructor(props){
    //DANA
    super(props);
    if (typeof props.post !== 'undefined'){
      this.state = {
        title: props.post.title,
        body: props.post.body,
        large_image_url: 'http://localhost:3000' + props.post.large_image_url
      }
    }else{
      this.state = {
        title: '',
        body: ''
      }
    }
  }
  handleTitleChange(event){
    this.state.title = event.target.value;
    this.setState({title: this.state.title});
    this.props.onChange(this.state);
  }
  handleBodyChange(event){
    this.state.body = event.target.value;
    this.setState({body: this.state.body});
    this.props.onChange(this.state);
  }
  handleImageSelect(imageBase64, imageFile){
    this.setState({image: imageBase64}) ;
    this.props.onChange(this.state);
  }
  onInvalidImage(){
    alert('Archivo de imagen invalido.')
  }
  onRemoveImage(){
  }
  render(){
    let image;
    if (this.state.image == null ){
      image = this.state.large_image_url;
    }else{
      image = this.state.image;
    }
    return(
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            type='text'
            defaultValue={this.state.title}
            placeholder='Titulo'
            onChange={this.handleTitleChange.bind(this)}
          />
        </FormGroup>
        <Grid>
          <Row>
            <Col md={2}>
              <ImageFileSelector
                onSelect={this.handleImageSelect.bind(this)}
                onInvalidImage={this.onInvalidImage}
                onRemoveImage={this.onRemoveImage}
              />
              <Image
                className='post-large-image'
                src={image}
              />
            </Col>
            <Col md={4}>
              <FormControl
                componentClass="textarea"
                rows="10"
                cols="10"
                type='text'
                defaultValue={this.state.body}
                placeholder='Cuerpo'
                onChange={this.handleBodyChange.bind(this)}
              />
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }
}

module.exports = EditPost;
