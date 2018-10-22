import React from 'react';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import {TextField ,RaisedButton} from 'material-ui';

class Signup extends React.Component{
    constructor(){
        super();
        this.state={
            fullname : '',
            email : '',
            password : ''
        }
    }
    signup = ()=>{
        const auth = firebase.auth();
        if(this.state.fullname === '' || this.state.email === ''  || this.state.password === '')
        {
            alert('Please complete all fields'); 
        }
        else
        {
            const promise = auth.createUserWithEmailAndPassword(this.state.email , this.state.password);
            promise.then(()=>{
                firebase.auth().currentUser.updateProfile({
                    displayName : this.state.fullname
                })
                let uids = firebase.auth().currentUser.uid;
                firebase.database().ref(`Users/${uids}`).set({
                 name : this.state.fullname ,
                 email : this.state.email,
                 category : 'user',
                 key : uids
                })
                this.props.history.push("/home");
            })
            promise.catch(e=>{
                alert(e.message);
                this.setState({
                    fullname : '',
                    email : '',
                    password : ''
                })
            })
        }
    }
    render(){
        return(
            <section className="App">
            <div>    
                <div style={style} className='paper'>
                    <h1 className="heading">SignUp Form</h1>
                <form>
                    <div>
                        <TextField value={this.state.fullname} floatingLabelText="Full Name :" onChange={(evt)=>this.setState({fullname : evt.target.value})}/>
                        <TextField value={this.state.email} floatingLabelText="Email Address :" onChange={(evt)=>this.setState({email : evt.target.value})}/>
                        <TextField value={this.state.password} floatingLabelText="Password :" type="password" onChange={(evt)=>this.setState({password : evt.target.value})}/><br/>
                    </div>
                    <br/>
                    <div className="newaccount">Already have account:<Link to='/'><a> SignIn</a></Link></div> <br/>
                    <RaisedButton  labelStyle={{color : 'black'}} onClick={this.signup} secondary={true}  label="SignUp"/>
                </form>
                </div>
            </div>
            </section>
        )
    }
}
const style = {
    height: 400,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    
  };
export default Signup;