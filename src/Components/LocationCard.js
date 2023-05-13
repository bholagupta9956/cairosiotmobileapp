import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors} from '../elements/Colors';
import Toast from 'react-native-toast-message';


const LocationCard = props => {

  const {navigation, item, indd} = props;
  const color = ['#4ea7fc', '#f5784b', '#ff8480', '#6b5af1', '#14a5a4'];

  const goToDevice = dta => {
    if (dta.devices) {
      navigation.navigate('device', {deviceData: dta});
    } else {
      Toast.show({
        type: 'info',
        text1: 'Warning',
        text2: 'Sorry , No device available !',
      });
    }
  };

  // const colors = color[parseInt(indd)%4];
  const colors = '#D8EFFF';

  const handleAlerts = data => {
    const val = {...data  , type : 'alerts'}
    if (data.Alerts == 0) {
      Toast.show({
        type: 'info',
        text1: 'Warning',
        text2: 'Sorry , No alerts available !',
      });
    } else {
      navigation.navigate("alert" , {alertData : val})
    }
  };

  const handleWarnings = (data) =>{
    const val = {...data  , type : 'warnings'}
    if (data.Warnings == 0) {
      Toast.show({
        type: 'info',
        text1: 'Warning',
        text2: 'Sorry , No alerts available !',
      });
    } else {
      navigation.navigate("alert" , {alertData : val})
    }
  }

  return (
    <View style={[styles.cardCont2, {backgroundColor: colors}]}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => goToDevice(item)}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
          <View style={styles.rdMrk}>
            <Image
              source={require('../../assets/icons/blueMarker.png')}
              resizeMode="contain"
              style={{width: 13}}
            />
          </View>
          <Text style={styles.locat}>{item.name}</Text>
        </View>
        <Text style={styles.crdlefTxt}>
          No of Devices : {item?.devices?.length ? item?.devices?.length : '0'}
        </Text>
        {/* <Text style={styles.crdlefTxt}>Project ID : {item.projectId}</Text> */}
        <View style={styles.btnCont}>
          <TouchableOpacity onPress={() => handleAlerts(item)}>
            <Text style={styles.btnTitle}>Alert : {item.Alerts} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleWarnings(item)}>
            <Text style={styles.btnTitle}>Warning : {item.Warnings}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  cardCont2: {
    width: '48%',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 18,
  },

  locat: {
    color: Colors.lightBlack,
    marginLeft: 12,
    fontSize: 17,
    fontWeight: 'bold',
    width: '70%',
  },

  rdMrk: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 6,
  },

  crdLefTitl: {
    color: Colors.lightBlack,
    fontSize: 20,
    fontWeight: 'bold',
  },

  crdlefTxt: {
    color: Colors.lightBlack,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 3,
  },

  btnCont: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  btnTitle: {
    width: '80%',
    marginVertical: 3,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#2C4089',
    borderRadius: 8,
    color: 'white',
  },
});
