import React, { Component } from 'react'
import { StatusBar, View, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import MIcon from 'react-native-vector-icons/EvilIcons'

var months = ["January", "February", "March", "April", 
"May", "June", "July", "August", "September", "October", 
"November", "December"];
 
var weekDays = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
];
var rows = [];
var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Calender extends Component {
  constructor(props) {
    super(props)
    this.state = {
        weekdayshort : moment.weekdaysShort(),
        dateObject: new Date()
    }
  }

  componentDidMount(){
   
  }

  generateMatrix() {
        var matrix = [];
        matrix[0] = weekDays;
        var year = this.state.dateObject.getFullYear();
        var month = this.state.dateObject.getMonth();
        
        // calculating first day
        var firstDay = new Date(year, month, 1).getDay();

        // calculating max days in month
        var maxDays = nDays[month];

        // calculation for leap year
        if (month == 1) {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        // creating matrix
        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                // for extra space before starting date
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                matrix[row][col] = counter++;
                }
            }
        }
        
        return matrix;
    }

    _onPress = (item) => {    
        this.setState(() => {
          if (!item.match && item != -1) {
            this.state.dateObject.setDate(item);
            return this.state;
          }
        });
    };

    changeMonth = (n) => {
        this.setState(() => {
          this.state.dateObject.setMonth(
            this.state.dateObject.getMonth() + n
          )
          return this.state;
        });
    }

    displayCalender = () => {
        var matrix = this.generateMatrix();
        console.log('matrix ==> ', matrix)
        return (
            rows = matrix.map((row, rowIndex) => {
                console.log('row ==> ', row)
                var rowItems = row.map((item, colIndex) => {
                    return (
                        <View key={item + ' ' + colIndex}
                            style={{
                                width:40,
                                height: 40,
                                borderRadius:20,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor: item == this.state.dateObject.getDate() ? '#ECEDF1': 'transparent',
                                //marginTop:rowIndex == 0 ? 0 : 40
                            }}
                        >
                            <Text
                                style={{
                                textAlign: 'center',
                                fontFamily:'Montserrat-Medium',
                                fontSize: rowIndex == 0 ? 13 : 15,
                                color: rowIndex == 0 ? 'grey' : '#111111',
                                }}
                                onPress={() => this._onPress(item)}>
                                {item != -1 ? item : ''}
                            </Text>
                            {
                                item == 15 || item == this.state.dateObject.getDate() ? 
                                <View style={{width:10, height:10, borderRadius:5, backgroundColor:'#D51236', position:'absolute', top:0, right:0}}/> :  null
                            }
                        </View> 
                    );
                });
                return (
                    <View
                        key={row + ' ' + rowIndex}
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        marginTop:30
                    }}>
                    {rowItems}
                    </View>
                );
            })
        )
    }

  render() {
    return (
     <View style={{flex:1, justifyContent:'center', backgroundColor:'#fff'}}>
         <StatusBar barStyle="dark-content" translucent backgroundColor="transparent"/>
         <View style={{flex:1, justifyContent:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => this.changeMonth(-1)} style={{marginRight:60}}>
                    <MIcon name='chevron-left' size={40} color='#111111' />
                </TouchableOpacity>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily:'Montserrat-SemiBold',
                    textAlign: 'center'
                    }}>
                    {months[this.state.dateObject.getMonth()]} &nbsp;
                    {this.state.dateObject.getFullYear()}
                </Text>
                <TouchableOpacity onPress={() => this.changeMonth(+1)} style={{marginLeft:60}}>
                    <MIcon name='chevron-right' size={40} color='#111111' />
                </TouchableOpacity>
            </View> 
            <View style={{marginTop:20}}>
                <View>
                    { this.displayCalender() }
                </View>
                <View style={{height:1, backgroundColor:'grey', position:'absolute', top:64, width:'92%', marginLeft:20}}/>
            </View>
        </View>
     </View>   
    )
  }
}

export default Calender
