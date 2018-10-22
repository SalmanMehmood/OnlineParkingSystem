import React from 'react';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import {TextField ,RaisedButton} from 'material-ui';

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email : '',
            password : ''
        }
    }
    login = ()=>{
        const auth = firebase.auth();
        if(this.state.email === ''  || this.state.password === ''){
            alert('Please complete fields')
        }
        else {
        const promise = auth.signInWithEmailAndPassword(this.state.email,this.state.password);
        promise.then(e=>{
            this.props.history.push('/home');
        })
        promise.catch(e => {
            alert(e.message)
            this.setState({
                email : '',
                password : ''
            })
          });
    }
    }
    render(){
        return(
            <section className="App">
            <div>    
                <div style={style} className='paper'>
                    <h1 className="heading">Login Form</h1>
                <form>
                    <div>
                        <TextField value={this.state.email} floatingLabelText="Email Address" onChange={(evt)=>this.setState({email : evt.target.value})}/>
                        <TextField value={this.state.password} floatingLabelText="Password" type="password" onChange={(evt)=>this.setState({password : evt.target.value})}/><br/>
                    </div>
                    <br/>
                    <div className="newaccount">Create a New Account:<Link to='/SignUp'><a> Signup</a></Link></div> <br/>
                    <RaisedButton  labelStyle={{color : 'black'}} onClick={this.login} primary={true}  label="Log In"/>
                </form>
                </div>
            </div>
            </section>
        )
    }
}
const style = {
    height: 330,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    
  };
export default Login;