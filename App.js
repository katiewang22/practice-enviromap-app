import React, { useState, useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import * as Location from 'expo-location';
import { styles } from './AppStyles.js';
 
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location); //coords stored as var location
    })();
  }, []);

  //Testing purposes
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Welcome to EnviroMap! Your coords are: {text}</Text>
    </View>
  );
}