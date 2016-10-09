import React from 'react';
import {Panel, FormControl, Table, Button} from 'react-bootstrap';
import TimeInput from './TimeInput.jsx'

class Hours extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date_times: [
        {
          week_day:'monday',
          time: '14:30'
        },
        {
          week_day:'tuesday',
          time: '14:40'
        }
      ]
    };
  }
  handleDeleteClick(index){
    if (this.state.date_times.length > 1){
      this.state.date_times.splice(index, 1);
      this.setState({date_times: this.state.date_times});
    }
  }
  handleCreateClick(){
    this.state.date_times.push({
      week_day:'Monday',
      time:''
    });
    this.setState({hours: this.state.hours});
  }
  handleOnChangeTime(){
    console.log('change time');
  }
  render(){
    let hours = this.state.date_times;
    let weekDays = ['monday', 'tuesday', 'wednesday',
      'thursday', 'friday', 'saturday', 'sunday'];
    let _this = this;
    return (
      <Panel>
        <Table>
          <tbody>
            <tr>
              <th>Dia</th>
              <th>Hora</th>
              <th>Accion</th>
            </tr>
            {
              hours.map(function(hour, index){

                let addButtonStyle = {};
                let removeButtonStyle = {};
                if (index !== hours.length - 1){
                  addButtonStyle = {display: 'none'};
                }else{
                  removeButtonStyle = {display: 'none'}
                }

                return <tr key={'hour' + index}>
                  <td>
                    <FormControl componentClass="select" placeholder="select">
                      {
                        weekDays.map(function(day, index){
                          return <option key={ 'option'+ index } value={day}>{day}</option>
                        })
                      }
                    </FormControl>
                  </td>
                  <td>
                    <TimeInput
                      initTime={hour.time}
                      mountFocus='true'
                      onChange={_this.handleOnChangeTime}
                    />
                  </td>
                  <td>
                    <Button
                      bsStyle='danger'
                      style={removeButtonStyle}
                      bsSize='xsmall'
                      onClick={_this.handleDeleteClick.bind(_this, index)}>
                      -
                    </Button>
                    <Button
                      bsStyle='success'
                      style={addButtonStyle}
                      bsSize='xsmall'
                      onClick={_this.handleCreateClick.bind(_this)}>
                      +
                    </Button>
                  </td>
                </tr>
            })}
          </tbody>
        </Table>
        <Button onClick={this.props.onSaveClick} bsStyle='primary'>Guardar</Button>
      </Panel>
    )
  }
}

module.exports = Hours;
