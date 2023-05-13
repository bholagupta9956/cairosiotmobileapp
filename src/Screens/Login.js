// Login Screen ;

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../elements/Colors';
import Button from '../elements/Button';
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import Pool from '../helpers/user-pool';
import Toast from 'react-native-toast-message';
import {validate} from 'react-email-validator';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {endpoints} from '../services/endpoints';
import OneSignal from 'react-native-onesignal';

const Login = props => {

  const {navigation} = props;
  const [enablepass, setEnablepass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [companyID, setCompanyID] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  const getFCMToken = async () => {
    
    const data = await OneSignal.getDeviceState();

    const token = data.pushToken;
    const playerId = data.userId;
    console.log(playerId, 'player id');
    setDeviceToken(playerId);
    return playerId;
  };

  useEffect(() => {
    getFCMToken();
    const accessToken = SyncStorage.get('accessToken');
    const companyIdd = SyncStorage.get('companyId');

    if (accessToken) {
      navigation.navigate('dashboard', {companyID: companyIdd});
    }
  }, []);

  const sendLoginDetails = (userDta, token) => {
    const compId = userDta[0]?.companyId;
    const userId = userDta[0]?.userId;
    const role = userDta[0]['custom:role'];
    const cognitoId = token.jwtToken;

    const url =
      'https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/user/loginDetails';

    const data1 = {
      userId: userId,
      role: userDta[0]?.role,
      cognitoId: cognitoId,
      deviceToken: deviceToken,
      companyId: compId,
      deviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    };

    const data2 = {
      userId: userId,
      role: userDta[0]['custom:role'],
      cognitoId: cognitoId,
      deviceToken: deviceToken,
      deviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    };

    const data = compId ? data1 : data2;

    console.log(data, 'data here');

    fetch(url, {method: 'POST', body: JSON.stringify(data)})
      .then(ress => ress.json())
      .then(res => {
        console.log(res, 'this is the response hereee');
        setIsLoading(false);
        if (compId) {
          SyncStorage.set('userDetails', userDta);
          SyncStorage.set('companyId', compId);
          navigation.navigate('dashboard', {companyID: compId});
        } else {
          SyncStorage.remove('companyId');
          navigation.navigate('dashboard', {companyID: ''});
        }
      })
      .catch(err => {
        console.log(err, 'this is the error');
        // alert("Somthing went wrong")
      });
  };

  const handleLogin = async () => {
    const deviceToken = await getFCMToken();
    // console.log(deviceToken, 'deviceToken');

    if (email === '') {
      setErrors({email: 'Please enter your email'});
    } else if (!validate(email)) {
      setErrors({email: 'Invalid email'});
    } else if (password === '') {
      setErrors({password: 'Password must not be blank'});
    } else {
      setErrors({});

      const Username = email;
      const Password = password;
      setIsLoading(true);

      await new Promise((resolve, reject) => {
        const user = new CognitoUser({Username, Pool});
        const authDetails = new AuthenticationDetails({
          Username,
          Password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: async data => {
            console.log('onSuccess:', data);
            resolve(data);
            const accessToken = data?.accessToken;
            const userName = data?.accessToken?.payload?.username
              ? data?.accessToken?.payload?.username
              : data?.accessToken?.payload?.sub;

            SyncStorage.set('accessToken', accessToken);
            if (userName) {
              const url = `https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/user/${userName}`;

              axios
                .get(url)
                .then(res => {
                  if (res.status === 200) {
                    // console.log(res, 'this isthe response off');
                    const userDetails = res?.data;
                    const companyId = res?.data[0]?.companyId;
                    if (companyId) {
                      setCompanyID(companyId);
                    }
                    sendLoginDetails(userDetails, accessToken);
                  }
                })
                .catch(err => {
                  console.log(
                    err,
                    'this is the error which we are getting here',
                  );
                });
            } else {
              // setIsLoading(false);
            }
            // setIsLoading(false);
          },
          onFailure: err => {
            console.error('onFailure: ', err);
            alert('Invalid Credentials');
            // reject('Errorhee', err);
            setIsLoading(false);
          },
          newPasswordRequired: data => {
            console.log('newPasswordRequired:', data);
            resolve(data);
            setIsLoading(false);
          },
        });
      });
    }
  };

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
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={val => setEmail(val)}
        />
      </View>
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <View style={styles.inputCont}>
        <Image
          source={require('../../assets/icons/lock.png')}
          resizeMode="contain"
          style={{width: 15}}
        />
        <TextInput
          placeholder="Password"
          style={[styles.input, {width: '85%'}]}
          keyboardType="default"
          value={password}
          secureTextEntry={enablepass ? false : true}
          onChangeText={val => setPassword(val)}
        />
        {enablepass ? (
          <TouchableOpacity onPress={() => setEnablepass(false)}>
            <Image
              source={require('../../assets/icons/eye.png')}
              resizeMode="contain"
              style={{width: 25}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEnablepass(true)}>
            <Image
              source={require('../../assets/icons/eyeoff.png')}
              resizeMode="contain"
              style={{width: 25}}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <View style={styles.expt}>
        <Text style={styles.exptText}>Login with OTP</Text>
        <Text style={styles.exptText}>Forget Password ?</Text>
      </View>
      <View style={{marginVertical: 18}}>
        <Button title="Login" onPress={handleLogin} isLoading={isLoading} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footText}>Not have account yet?</Text>
        <TouchableOpacity>
          <Text
            style={[styles.footText, {marginLeft: 6, color: Colors.primary}]}>
            Register
          </Text>
        </TouchableOpacity>
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
    marginBottom: 29,
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
  expt: {
    width: '85%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 8,
    fontSize: 12,
    color: Colors.lightBlack,
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  footText: {
    color: Colors.lightBlack,
  },
  exptText: {
    fontSize: 13,
    color: Colors.lightBlack,
  },
  error: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: -4,
    color: 'red',
  },
});
