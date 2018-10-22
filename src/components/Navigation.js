import React from 'react';
import * as firebase from 'firebase';
import {AppBar} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open : false,
            Login_User_Name : '',
            category : ''
        }
    }
    handleClose = () => this.setState({open: false});
    drawer = ()=>{
        let user = firebase.auth().currentUser;
        if(user){
        firebase.database().ref(`Users/${user.uid}`).on('value',snap=>{
            var data = snap.val();
            this.setState({
                Login_User_Name : data.name,
                category : data.category,
                open: !this.state.open,
            })
        })
        }
    }
    signout1 = ()=>{
        firebase.auth().signOut();
        this.setState({open : false})
    }
    render(){
        return(
            <section>
                <AppBar
                title="Online Parking System" style={{backgroundColor : '#0C090A'}}
                onLeftIconButtonClick={()=>{this.drawer()}}  />

                <div>
                <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                >
                <MenuItem>{this.state.Login_User_Name}</MenuItem><hr/>
                <MenuItem >{this.state.category}</MenuItem>
                <Link to="/" ><MenuItem onClick={this.signout1}>SIGN OUT</MenuItem></Link>
                </Drawer>
                </div>
            </section>
        )
    }
}
export default Navigation;