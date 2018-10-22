import React from 'react';
import firebase from 'firebase';
import {TextField ,RaisedButton} from 'material-ui';

class Feedback extends React.Component{
    constructor(){
        super();
        this.state={
            feedback : '',
            uids : '',
            username : '',
            feedbackdata : [],
            feedbackkey : []
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            let uids = user.uid;
            let username = user.displayName;
            firebase.database().ref('Feedback/').on('value',snap=>{
                let data = snap.val();
                let feedbackdata = [];
                let feedbackkey = [];
                for(var key in data){
                    if(data[key].uids === uids){
                        feedbackdata.push(data[key]);
                        feedbackkey.push(key);
                    }
                }
                this.setState({uids : uids ,username:username , feedbackdata:feedbackdata ,feedbackkey : feedbackkey})
            })
        })
    }
    sendfeedback = () =>{
        if(this.state.feedback === ''){
            alert("Filled all fields....")
        }
        else{
            firebase.database().ref(`Feedback/`).push({
                uids : this.state.uids,
                feedback : this.state.feedback,
                username : this.state.username,
                reply : ''
            })
            this.setState({feedback : ''})
        }
    }
    deletefeedback = (index) =>{
        firebase.database().ref(`Feedback/${this.state.feedbackkey[index]}`).remove();
    }
    render(){
        return(
            <section>
                {this.state.feedbackdata.map((data,index)=>{
                    return(
                    <div className="check111" key={index}>
                        <div className="check222">
                            <h2>{data.username}</h2>
                        </div>
                            <div className="scroll">
                                FeedBack : <h4>{data.feedback}</h4>
                               Admin Reply : <h4>{data.reply}</h4>
                            </div>
                                <RaisedButton label="Delete"  backgroundColor = 'red' onClick={()=>{this.deletefeedback(index)}} labelStyle={{color : 'white'}}/><br/><br/>
                    </div>
                    )
                })}
                <div style={style} className="paper"> 
                    <TextField floatingLabelText="Write Feedback here...."  onChange={(evt)=>{this.setState({feedback : evt.target.value})}} value={this.state.feedback}/>                                   <br /><br/>
                    <RaisedButton label="Submit" labelStyle={{color : 'white'}} onClick={()=>{this.sendfeedback()}} backgroundColor = 'black'/>
                </div> 
            </section>
        )
    }
}
const style = {
    height: 140,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'block',
  };
export default Feedback;