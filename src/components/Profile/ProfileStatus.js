import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false
  }
  activateEditMode (){
    // debugger;
    // console.log('this', this);
    this.setState({editMode: true})
  }
  deActivateEditMode (){
    this.setState({editMode: false})
  }
  render()
  {
  return (
    <div>
      {!this.state.editMode && 
        <div>
      <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
    </div>
    }
    {this.state.editMode &&
    <div>
      <input onFocus={true} onBlur={this.deActivateEditMode.bind(this)} value={this.props.status}/>
    </div>
    }
    </div>
  )}
}

export default ProfileStatus;
