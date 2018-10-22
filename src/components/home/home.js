import React from 'react';
import * as firebase from 'firebase';
import {Tabs, Tab} from 'material-ui/Tabs';
import Areas from '../../admin/area';
import Bookingarea from '../../user/Bookingarea';
import MyBooking from '../../user/MyBooking';
import AllBooking from '../../admin/AllBooking';
import Feedback from '../../user/Feedback';
import Adminfeedback from '../../admin/AdminFeedback';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            slideIndex: 1,
            category : ''
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            let uids = user.uid;
            firebase.database().ref(`Users/${uids}`).on('value',snap=>{
                var data = snap.val()
                this.setState({category : data.category})
            })
        })
    }
    render(){
        return(
        <div className="container">
            <Tabs 
            onChange={(value)=>{this.setState({ slideIndex: value,})}}
            value={this.state.slideIndex}>
            <Tab label={this.state.category === 'user' ? 'Available Booking Area' : 'Areas'} value={0} style={{backgroundColor :'#0C090A'}}>
                <div className="App">
                    {this.state.category === 'user' ? <Bookingarea/> : <Areas/>}
                </div>
            </Tab>
            <Tab label={this.state.category === 'user' ? 'My Booking' : 'All Booking'} value={1} style={{backgroundColor :'#0C090A'}} >
                <div className="App">
                    {this.state.category === 'user' ? <MyBooking/> : <AllBooking/>}
                </div>
            </Tab>
            <Tab label={this.state.category === 'user' ? 'FeedBack' : 'Comments'} value={2} style={{backgroundColor :'#0C090A'}}>
                <div className="App">
                {this.state.category === 'user' ? <Feedback/> : <Adminfeedback/>}
                </div> 
            </Tab>
            </Tabs>
      </div> 
        )
    }
}
export default Home;