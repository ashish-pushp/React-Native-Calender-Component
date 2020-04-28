
import React from 'react';
import {
  View,
} from 'react-native';

import Calender from './src/app'

export default class App extends React.Component {
  render() {
    return (
      <View style = {{flex:1}}>
        <Calender/>
      </View>
    );
  }
}
