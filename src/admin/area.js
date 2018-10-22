import React from 'react';
import * as firebase from 'firebase';
import {TextField ,RaisedButton} from 'material-ui';

 class Areas extends React.Component{
     constructor(){
         super();
         this.state={
            Name : '',
            Number : ''
         }
     }
     bookingarea = () => {
         if(this.state.Name === '' || this.state.Number === ''){
             alert('Please fill all fields!!!')
         }
         else{
             firebase.database().ref('Areaname').push({
                 Areaname: this.state.Name, 
                 slots: (() => {
                     let arr = [];
                     arr.length = this.state.Number;
                     arr.fill(`slot`);
                     return arr
                 })()
             })
             this.setState({ Number: '', Name: '' })
         }
    }
    render(){
        return(
        <div style={style} className="paper"> 
            <TextField
            floatingLabelText="Area Name" value={this.state.Name}
            onChange={(e) => { this.setState({ Name: e.target.value }) }}/><br />
            <TextField 
                floatingLabelText="No of Slot" value={this.state.Number}
                onChange={(e) => { this.setState({ Number: Number(e.target.value) }) }}/><br />
            <RaisedButton label="Add Area"onClick={()=>{this.bookingarea()}} primary={true} />
        </div> 
        )
    }
}
export default Areas;
const style = {
    height: 200,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };