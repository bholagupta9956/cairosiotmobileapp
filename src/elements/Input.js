// Login Screen ;

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
  } from 'react-native';
  import React, { useState } from 'react';
  import {Colors} from '../elements/Colors';
  import Button from '../elements/Button';
  
  
  const Login = () => {
  
    const [enablepass , setEnablepass] = useState(false);
    
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Welcome !</Text>
          <Text style={styles.text}>Please Login to your app</Text>
        </View>
  
  
        <View style={styles.inputCont}>
          <Image
            source={require('../../assets/icons/user.png')}
            resizeMode="contain"
            style={{width: 15}}
          />
          <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
        </View>
        <View style={styles.inputCont}>
          <Image
            source={require('../../assets/icons/lock.png')}
            resizeMode="contain"
            style={{width: 15}}
          />
          <TextInput placeholder="Password" style={[styles.input , {width : '85%'}]} keyboardType="default" />
          <Image
            source={require('../../assets/icons/eye.png')}
            resizeMode="contain"
            style={{width: 20}}
          />
        </View>
  
        <View style={styles.expt}>
            <Text style={styles.exptText}>Login with OTP</Text>
            <Text style={styles.exptText}>Forget Password ?</Text>
        </View>
        <View style={{marginVertical : 18}}>
        <Button />
        </View>
  
        <View style={styles.footer}>
          <Text style={styles.footText}>Not have account yet?</Text>
          <Text style={[styles.footText , {marginLeft : 6 , color : Colors.primary}]}>Register</Text>
        </View>
      </View>
    );
  };
  
  const wd = Dimensions.get('screen').width;
  const ht = Dimensions.get('screen').height;
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f5fb',
    },
    logo: {
      width: '70%',
      alignSelf: 'center',
      height: 120,
      marginTop: '8%',
    },
    header: {
      alignSelf: 'center',
      marginVertical: 13,
      marginBottom : 29
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      color: Colors.black,
      textAlign: 'center',
    },
    text: {
      marginTop: 8,
      color: Colors.lightBlack,
      fontSize: 16,
      textAlign: 'center',
    },
    inputCont: {
      width: wd * 0.85,
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 50,
      marginTop: 35,
      width: '85%',
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      paddingHorizontal: 20,
      paddingVertical: 0,
      alignItems: 'center',
    },
  
    input: {
      width: '80%',
      marginLeft: 7,
      fontSize: 15,
    },
    expt : {
      width : '85%' ,
      flexDirection : 'row',
      alignSelf : 'center' ,
      paddingHorizontal : 10 ,
      justifyContent : "space-between",
      marginTop : 8 ,
      fontSize : 12,
      color : Colors.lightBlack
    } ,
    footer : {
      alignSelf : "center" ,
      flexDirection : "row"
    } ,
    footText : {
      color : Colors.lightBlack
    } ,
    exptText : {
      fontSize : 13 ,
      color : Colors.lightBlack
    }
  });
  