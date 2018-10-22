import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

class AllBooking extends React.Component{
    constructor(){
        super();
        this.state={
            bookingdata : [],
            bookingkey : [],
        }
    }
    componentDidMount(){
        firebase.database().ref(`Booking/`).on('value',snap=>{
            let data = snap.val();
            let bookingdata = [];
            let bookingkey = [];
            for(var key in data){
                bookingdata.push(data[key]);
                bookingkey.push(key);
            }
            this.setState({bookingdata:bookingdata , bookingkey:bookingkey})
        })
    }
    deletebooking = (index) =>{
        let data = this.state.bookingdata;
        let bookingkey = this.state.bookingkey;
        firebase.database().ref(`Booking/${bookingkey[index]}`).remove();
        firebase.database().ref(`Areaname/${data[index].areakey}/slots`).update({
            [data[index].bookslotno] : 'slot'
        })

    }
    render(){
        return(
            this.state.bookingdata.map((data1,index)=>{
                return(
                        <div className="check11" key={index}>
                        <div className="check22">
                          <h2>{data1.username}</h2>
                        </div>
                        <p><strong>{data1.areaname}</strong></p>
                        <p>TimeFrom : {data1.timefrom}  TimeTo : {data1.timeto}</p>
                        <h4>Date : {data1.date}</h4>
                        <h4>BookedSlot# : {data1.bookslotno}</h4>
                        <RaisedButton label="Delete"  backgroundColor = 'black' onClick={()=>{this.deletebooking(index)}} labelStyle={{color : 'white'}}/><br/><br/>
                       </div>
                )
            })
            )
    }
}
export default AllBooking;