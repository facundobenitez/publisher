import React from 'react'
import {Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap'; 

class SelectGroups extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     groups: [],
     selectedGroups: []
    }
  }
  componentDidMount(){
    let _this = this;
    fetch('http://localhost:3000/groups', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function(response){
      return response.json();
    }).then(function(json){
      _this.setState({
        groups: json
      })
    }).catch(function(error){
      alert(error);
    });
  }
  handleGroupClick(e){
    let selectedGroup = e.target.getAttribute('data-group');
    let selectedGroups = this.state.selectedGroups;
    if (e.target.checked){
      if (selectedGroups.indexOf(selectedGroup) < 0){
        selectedGroups.push(selectedGroup);
      }
    }else{
      let index = selectedGroups.indexOf(selectedGroup);
      selectedGroups.splice(index, 1);
    }
    this.setState({
      selectedGroups: selectedGroups
    });
  }
  render(){
    let groups = this.state.groups
    let _this = this;
    return(
      <div>
        {groups.map(function(group, i){
        return (
          <Checkbox
            key={i}
            onClick={_this.handleGroupClick.bind(_this)}
            data-group={group.id}>
            {group['name']}
          </Checkbox>
        )
        })}
      </div>
    )
  }
}

module.exports = SelectGroups;
