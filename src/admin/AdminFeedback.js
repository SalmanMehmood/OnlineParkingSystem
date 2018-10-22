import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

 class Adminfeedback extends React.Component{
    constructor(){
        super();
        this.state={
            feedbackdata : [],
            feedbackkey : [],
            comment : ''
        }
    }
    componentDidMount(){
        firebase.database().ref('Feedback/').on('value',snap=>{
            let data = snap.val();
            let feedbackdata = [];
            let feedbackkey = []
            for(var key in data){
                feedbackdata.push(data[key])
                feedbackkey.push(key)
            }
            this.setState({feedbackdata : feedbackdata , feedbackkey : feedbackkey})
        })
    }
    replyfeedback = (index)=>{
        if(this.state.comment === ''){
            alert('Write something...')
        }
        else{
            firebase.database().ref(`Feedback/${this.state.feedbackkey[index]}`).update({
                reply : this.state.comment
            })
            this.setState({comment : ''})
        }
    }
    deletefeedback = (index) =>{
        console.log(this.state.feedbackkey[index]);
        firebase.database().ref(`Feedback/${this.state.feedbackkey[index]}`).remove();
    }
    render(){
        return(
            this.state.feedbackdata.map((data,index)=>{
                return(
                    <div className="check11" key={index}>
                    <div className="check22">
                      <h2>{data.username}</h2>
                    </div>
                    <div className="scroll">
                        Student FeedBack : <h4>{data.feedback}</h4>
                        Reply : <h4>{data.reply}</h4>
                    </div>
                    <input type ="text" placeholder="write here...."  value={this.state.comment} onChange={(evt)=>{this.setState({comment : evt.target.value})}} className="textfield"/>            
                    <RaisedButton label="Submit"  backgroundColor = 'black' onClick={()=>{this.replyfeedback(index)}} labelStyle={{color : 'white' , }}/>
                    <RaisedButton label="Delete"  backgroundColor = 'Red' onClick={()=>{this.deletefeedback(index)}} style={{marginLeft:10,}} labelStyle={{color : 'white'}}/>
                   </div>
                )
            })

        )
    }
}
export default Adminfeedback;