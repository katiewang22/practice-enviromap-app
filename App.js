import React, { useState, useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import * as Location from 'expo-location';
import { styles } from './AppStyles.js';
 
export default function App() {
  /*
  1. Get current location
  2. Set location's latitude and longitude as variables
  3. Intial view = location's lat and long*/

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let userLatitude = location.coords.latitude;
      let userLongitude = location.coords.longitude;
      setUserLatitude(userLatitude);
      setUserLongitude(userLongitude);
    })();
  }, []);

  let text1 = 'Waiting...';
  if (errorMsg) {
    text1 = errorMsg;
  } else if (location) {
    text1 = JSON.stringify(userLatitude);
  }

  let text2 = 'Waiting..';
  if (errorMsg) {
    text2 = errorMsg;
  } else if (location) {
    text2 = JSON.stringify(userLongitude);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Welcome to EnviroMap! Your latitude is: {text1}. Your longitude is: {text2}.</Text>
    </View>
  );
}