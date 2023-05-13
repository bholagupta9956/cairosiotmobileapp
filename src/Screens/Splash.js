import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';


const Splash = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 2000);

  }, []);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splashBack.png')}
        resizeMode="cover"
        style={styles.backImg}>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
  },
});


// "{\"Time\":\"18:31\",\"projectId\":\"SIFJB\",\"deviceId\":\"6wqRa\",\"modeId\":\"0\",\"Equipment\":\"AC-08\",\"Mode\":\"102TPR\",\"Location\":\"Amarpur Jorasi\",\"deviceOutput\":\"Bus Bar Voltage:1050V\"}"

// {"Time" : "18:31" , "projectId" : "SIFJB" , "deviceId" : "6wqRa" , "modeId" : "0" , "Equipment" : "AC-08" , "Mode" : "102TPR" , "Location" : "Amarpur Jorasi" , "deviceOutput" : "{Bus Bar Voltage" : "1050V}"}