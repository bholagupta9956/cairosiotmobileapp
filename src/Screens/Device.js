// In this all the device will be mentioned ;
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../elements/Colors';
import {endpoints} from '../services/endpoints';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Card = props => {

  const {navigation, data} = props;

  const goToMode = modes => {
    if (modes) {
      navigation.navigate('mode', {modeData: modes});
    } else {
      Toast({
        type: 'info',
        text1: 'Warning',
        text2: 'Sorry , No modes available',
      });
    }
  };

  return (
    <View style={styles.cardCont2}>
      <TouchableOpacity onPress={() => goToMode(data)}>
        <Image
          source={require('../../assets/icons/iot.png')}
          style={styles.iotImg}
          resizeMode="contain"
        />
        <Text style={[styles.devName, {fontWeight: 'bold'}]}>{data.name}</Text>
        <Text style={styles.devName}>
          No of Devices :{' '}
          {data?.latestDataByModeId?.length
            ? data?.latestDataByModeId?.length
            : 0}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Device = props => {
  const {route, navigation} = props;
  const device = route.params.deviceData;
  const deviceData = device?.devices;
  const projectId = device.projectId;
  const deviceDetails = endpoints.getDevice + `/${projectId}/devices`;
  const [deviceDatas, setDeviceDatas] = useState([]);

  useEffect(() => {
    axios
      .get(deviceDetails)
      .then(res => {
        if (res.status === 200) {
          var val = res.data;

          var dta = []
          for(var i = 0 ; i < val.length ; i++){
            var name = val[i].name ;
            var id = name.match(/(\d+)/)?.[0]
            var selectedData = val[i]

            var data = {...selectedData , uniqueId : id}
            dta.push(data)
            
          }
         
          dta.sort((a, b) => {
            return a.uniqueId - b.uniqueId;
        });

          setDeviceDatas(dta);
        }
      })
      .catch(err => {
        console.log('ERROR here', err);
      });
  }, []);

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  const newdate = day + '/' + month + '/' + year;

 

  return (
    <View style={styles.container}>
      <View style={styles.profCont}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backCont}>
            <Image
              source={require('../../assets/icons/backArrow.png')}
              style={styles.back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text}>{device.name}</Text>
        </View>
        <View style={styles.profIcon}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/googleMap.png')}
              style={styles.gmap}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('map')}>
            <Image
              source={require('../../assets/icons/profile.png')}
              resizeMode="contain"
              style={styles.user}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require('../../assets/images/dashBack.png')}
        style={styles.dashBack}
      />

      <View style={styles.secCont}>
        <View style={styles.devic}>
          <ScrollView showsVerticalScrollIndicator={false} style={{}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              {deviceDatas.map((item, index) => {
                return (
                  <>
                    <Card {...props} data={item} key={index} />
                  </>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Device;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgColor,
    position: 'relative',
  },

  topBack: {
    width: '100%',
    height: '50%',
    borderColor: 'red',
    borderWidth: 2,
    paddingLeft: '5%',
  },
  gmap: {
    width: 40,
    marginHorizontal: 6,
    height: 40,
  },
  title: {
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.black,
  },

  text: {
    marginLeft: '5%',
    fontSize: 22,
    color: '#3e4f9a',
    fontWeight: 'bold',
  },

  profCont: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  user: {
    width: 40,
    height: 40,
    marginHorizontal: 6,
  },

  gmap: {
    width: 40,
    marginHorizontal: 6,
    height: 40,
  },

  profile: {
    alignSelf: 'flex-end',
    width: 44,
    height: 44,
  },

  dashBack: {
    position: 'absolute',
    zIndex: -1,
    width: '70%',
    right: 0,
    top: 0,
    height: '30%',
  },

  secCont: {
    flex: 1,
    backgroundColor: '#7461de',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  locat: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#8877e3',
    minWidth: '45%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 8,
  },

  devic: {
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  cardCont2: {
    width: '48%',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 10,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#ebebfb',
    justifyContent: 'center',
  },

  iotImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },

  devName: {
    alignSelf: 'center',
    fontSize: 18,
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  back: {
    width: 18,
    height: 18,
  },
});
