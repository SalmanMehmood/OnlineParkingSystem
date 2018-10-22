import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

class Displayslot extends React.Component{
    constructor(){
        super();
        this.state={
            slot : [],
            uids : '',
            place : '',
            username : ''
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            let username = user.displayName;
            let uids = user.uid; 
            this.setState({uids:uids , username:username})
        })
        firebase.database().ref('Areaname/').on('value',snap=>{
            let data = snap.val();
            let slot = [];
            let place = ''
            for(var key in data){
                if(key === this.props.slotkey[this.props.index1]){
                    place = data[key].Areaname
                    slot.push(data[key]);
                }
            }
            this.setState({slot : slot , place : place})
        })
    }
    scrolldownwards = ()=>{
        document.getElementById('scroll').scrollTop=99999
    }
    bookingmethod = (index)=>{
        firebase.database().ref(`Areaname/${this.props.slotkey[this.props.index1]}/slots`).update({
            [index] : 'booked'
        })
        let date = this.props.date;
        let inputdate =date.getDate() + '-' + (date.getMonth()+1)+ '-' + date.getFullYear();
        let timefrom1 = this.props.timefrom;
        var inputtimefrom = timefrom1.getHours() + ':' + timefrom1.getMinutes() + ':' + timefrom1.getSeconds();
        let timeto1 = this.props.timeto;
        var inputtimeto = timeto1.getHours() + ':' + timeto1.getMinutes() + ':' + timeto1.getSeconds();
        firebase.database().ref('Booking/').push({
            key : this.state.uids,
            areakey : this.props.slotkey[this.props.index1],
            date : inputdate,
            username : this.state.username,
            timefrom : inputtimefrom,
            timeto : inputtimeto,
            areaname : this.state.place,
            bookslotno: index
        })
    }
    render(){
        return(
            <section>
                <h1>Available And Booked Slots</h1>
                <div id="scroll" >
                    {this.state.slot.map((data,index)=>{
                        let check = Object.values(data.slots);
                        return(
                        check.map((data1,index)=>{
                            if(data1 === 'booked'){
                                return(
                                    <RaisedButton key={index} label={(data1)} style={{marginLeft:10,marginBottom : 10}} labelStyle={{color : 'black'}}  disabled={true} />
                                )
                            }
                            else{
                                return(
                                <RaisedButton key={index} label={(data1 + " " + (index+1))} onClick={()=>{this.bookingmethod(index)}} backgroundColor="black" style={{marginLeft:10 ,marginBottom : 10}} labelStyle={{color : 'white'}} />
                                )   
                            }
                        })
                        )
                    })}
                </div>
            </section>
        )
    }
}
export default Displayslot;