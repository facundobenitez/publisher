import React from 'react';
import {Col, Form, FormGroup, Panel, FormControl, Button} from 'react-bootstrap';

class Frecuency extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hours: 1
    };
  }
  handleHoursChange(event){
    this.setState({hours: event.target.value})
  }
  render(){
    let hours = this.state.hours;
    let _this = this;
    return (
      <Panel>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              Horas
            </Col>
            <Col sm={10}>
              <FormControl
                type='text'
                defaultValue={this.state.hours}
            placeholder='Hours'
                onChange={this.handleHoursChange.bind(this)}              />
            </Col>
          </FormGroup>
        </Form>
        <Button onClick={this.props.onSaveClick} bsStyle='primary'>Guardar</Button>
      </Panel>
    )
  }
}

module.exports = Frecuency;
