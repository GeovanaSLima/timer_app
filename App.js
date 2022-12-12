import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [time, setTime] = useState(0);
  const [button, setButton] = useState("START");
  const [last, setLast] = useState(null);

  function  start() {
    if(timer !== null){
      // Stop timer and set it to null
      clearInterval(timer);
      timer = null;
      setButton("START");
    } else {
      // Start the timer
      timer = setInterval(() => {
        ss++;

        if(ss == 60){
          ss = 0;
          mm++;
        }
        if(mm == 60){
          mm = 0;
          hh++;
        }

        let format = 
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss)

        setTime(format);
      }, 1000);
      setButton('STOP');
    }
  }

  function reset() {
    if(timer !== null){
      // Stop timer
      clearInterval(timer);
      timer = null;
    }

    setLast(time);
    setTime(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setButton("START");
  }

  return (
    <View style={ styles.container }>
      <Image
      source={require('./src/crono.png')}
      />

      <Text style={ styles.timer }> { time } </Text>

      <View style={ styles.btnArea }>
        <TouchableOpacity style={ styles.btn } onPress={ start }>
          <Text style={ styles.btnText }> {button} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.btn } onPress={ reset }>
          <Text style={ styles.btnText }> RESET </Text>
        </TouchableOpacity>

      </View>

      <View style={ styles.areaLast }>
        <Text style={ styles.textRun }> 
          { last ? 'Last Time: ' + last : ''}
        </Text>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC5C65',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 45,
    margin: 17,
    borderRadius: 3,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FC5C65',
  },
  areaLast: {
    marginTop: 40,
  },
  textRun: {
    fontSize: 25,
    color: '#FFF',
    fontStyle: 'italic',
  }
})