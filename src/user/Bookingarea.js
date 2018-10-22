import React from 'react';
import * as firebase from 'firebase';
import {Table, TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import {RaisedButton,DatePicker,TimePicker} from 'material-ui';
import Displayslot from './displayslot';

class Bookingarea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            areanames_slot : [],
            areaname : [],
            slotkey : [],
            success : false,
            toglestate : true,
            index : null,
            TimeFrom : null,
            TimeTo : null,
            controlledDate: null
        }
    }
    componentDidMount(){
        firebase.database().ref(`Areaname/`).on('value',snap=>{
            var areanames_slot = [];
            var areaname = [],
            slotkey = []
            let data = snap.val();
            for(var key in data){
                slotkey.push(key) 
               areanames_slot.push(data[key])
               areaname.push(data[key].Areaname)
            }
            this.setState({areanames_slot : areanames_slot , areaname : areaname, slotkey :slotkey})
        })
        
    }
      getvalues = ()=>{          
        if(this.state.controlledDate === null || this.state.TimeFrom === null || this.state.TimeTo === null)
          {
            alert("Please Completly filled all fields....")
          }
        else{
            //computer date...
            let check = new Date();
            let datenow =check.getDate()+ (check.getMonth()+1) + check.getFullYear();
            let todaytodate = Date.parse(datenow);
            let comptime = check.getHours() + ':' + check.getMinutes() + ':' + check.getSeconds();
            let splitcomptime = comptime.split(':');
            var originaltimesec = ((+splitcomptime[0] * 60 * 60) + (+splitcomptime[1] * 60) + (+splitcomptime[2]));
            // input user date...
            let userdate = this.state.controlledDate;
            let inputuserdate = userdate.getDate() + (userdate.getMonth()+1) +userdate.getFullYear();
            let inputtodate = Date.parse(inputuserdate); 
            // time From
            let timefrom = this.state.TimeFrom;
            var timecheck = timefrom.getHours() + ':' + timefrom.getMinutes() + ':' + timefrom.getSeconds();
            var splittimefrom = timecheck.split(':');
            var timefromseconds = ((+splittimefrom[0] * 60 * 60) + (+splittimefrom[1] * 60) + (+splittimefrom[2]));
            // Time To
            let timeto = this.state.TimeTo;
            var timetoclean = timeto.getHours() + ':' + timeto.getMinutes() + ':' + timeto.getSeconds();
            var splittimeto = timetoclean.split(':');
            var timetoseconds = ((+splittimeto[0] * 60 * 60) + (+splittimeto[1] * 60) + (+splittimeto[2]));
            if(todaytodate === inputtodate){
                if(timefromseconds >= originaltimesec){
                    if(timetoseconds >= timefromseconds){       
                        this.setState({success : true})   
                    }
                    else{
                        alert('Enter correct time.....')
                        this.setState({success : false})
                    }
                }
                else{
                    alert('Enter correct time.....')
                    this.setState({success : false})
                    }
            }
            else if(inputtodate > todaytodate){
                if(timefromseconds < timetoseconds){
                    this.setState({success : true}) 
                }
                else{
                    alert('Enter correct time....');
                    this.setState({success : false})
                }
            }
            else{
                alert('enter future date....')
                this.setState({success : false})
            }
        }
        setTimeout(() => this.scrolldownwards(), 200);

      }
    renderform1 = (index)=>{
        return(
            <div style={style} className="paper">
                <h2>Online Parking System</h2>
                <h3>Place : {this.state.areaname[index]}</h3>
                <DatePicker
                hintText="Controlled Date Input"
                value={this.state.controlledDate}
                onChange={(event, date)=>{this.setState({controlledDate : date})}}/>
                <TimePicker
                format="ampm"
                hintText="Time From"
                value={this.state.TimeFrom}
                onChange={(evt , date)=>{this.setState({TimeFrom : date})}}/>
                <TimePicker
                format="ampm"
                hintText="Time To"
                value={this.state.TimeTo}
                onChange={(evt , date)=>{this.setState({TimeTo : date})}}/>
                <RaisedButton backgroundColor="white" style={{margin:20}} labelStyle={{color : 'black'}} label="Cancel" onClick={()=>{this.setState({toglestate : true , success : false})}}/>
                <RaisedButton backgroundColor="black" labelStyle={{color : 'white'}} label="Submit" onClick={()=>{this.getvalues()}}/>
            </div>
        )
    }
    renderform = ()=>{
        return(
            <div className="table">
                <Table selectable={false} >
                <TableHeader style={{backgroundColor:"red"}} adjustForCheckbox={false}  displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn style={{color:'white' , fontSize : 15 , textAlign : 'center'}}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={{color:'white' , fontSize : 15  , textAlign : 'center'}}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{color:'white' , fontSize : 15  , textAlign : 'center'}}>Status</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.state.areanames_slot.map((data1,index)=>{
                        return(
                <TableRow key={index}>
                    <TableRowColumn style={{ textAlign : 'center'}}>{index+1}</TableRowColumn>
                    <TableRowColumn style={{ textAlign : 'center'}}>{data1.Areaname}</TableRowColumn>
                    <TableRowColumn style={{ textAlign : 'center'}}><RaisedButton backgroundColor="black" onClick={()=>{this.setState({index : index , toglestate : false})}} labelStyle={{color : 'white'}} label="Booking"/></TableRowColumn>
                </TableRow>
                        )
                    })}
                </TableBody>
                </Table>
            </div>
        )
    }
    scrolldownwards = ()=>{
        let root = document.getElementById('root');
        root.scroll(0, root.offsetHeight);
    }
    render(){
        return(
            <section>
                {this.state.toglestate ? this.renderform() : this.renderform1(this.state.index)}
                {this.state.success ? <Displayslot index1={this.state.index} slotkey={this.state.slotkey} date={this.state.controlledDate} timefrom = {this.state.TimeFrom} timeto={this.state.TimeTo}/>  : <div></div>}
            </section>
        )
    }
}
const style = {
    marginTop : 20,
    height: 330,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    
  };
export default Bookingarea;





        //   let check1 = String(check);
        //   let cond1 = check1.slice(0,15)
        //   var date = this.state.controlledDate;
        //   let date1 =String(date)
        //   let cond = date1.slice(0,15)
        //   console.log(cond);
        //   console.log(cond1)
        //   let timefrom = this.state.TimeFrom;
        //   let timefrom1 =String(timefrom)
        //   console.log("Time From : "+timefrom1.slice(15,24))
        //   let timeto  =this.state.TimeTo;
        //   let timeto1 = String(timeto);
        //   console.log("Time To : "+timeto1.slice(15,24))
        