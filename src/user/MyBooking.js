import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

class MyBooking extends React.Component{
    constructor(){
        super();
        this.state={
            uids : '',
            bookeddata : [],
            bookdatakey: [],
            username : ''
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            let uids = user.uid;
            let username = user.displayName;
            this.setState({uids:uids , username:username})
            firebase.database().ref(`Booking/`).on('value',snap=>{
                let bookeddata = [];
                let bookdatakey = []
                var data = snap.val();
                for(var key in data){
                    if(data[key].key === this.state.uids){
                        bookeddata.push(data[key]);
                        bookdatakey.push(key);
                    }
                }
                this.setState({bookeddata:bookeddata , bookdatakey:bookdatakey})
            })
        })
    }
    deletebooking = (index)=>{
        let data = this.state.bookeddata;
        let key = this.state.bookdatakey;
        firebase.database().ref(`Booking/${key[index]}`).remove();
        firebase.database().ref(`Areaname/${data[index].areakey}/slots`).update({
            [data[index].bookslotno] : 'slot'
        })
        // console.log(data[index].areakey,data[index].bookslotno);
    }
    render(){
        return(
            this.state.bookeddata.map((data,index)=>{
                return(
                        <div className="check11" key={index}>
                        <div className="check22">
                          <h2>{this.state.username}</h2>
                        </div>
                        <p><strong>{data.areaname}</strong></p>
                        <p>TimeFrom : {data.timefrom}  TimeTo : {data.timeto}</p>
                        <h4>Date : {data.date}</h4>
                        <h4>BookedSlot# : {data.bookslotno}</h4>
                        <RaisedButton label="Delete"  backgroundColor = 'black' onClick={()=>{this.deletebooking(index)}} labelStyle={{color : 'white'}}/><br/><br/>
                       </div>
                )
            })
        )
    }
}
export default MyBooking;