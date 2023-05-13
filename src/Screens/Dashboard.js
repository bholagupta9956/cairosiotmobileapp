import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../elements/Colors';
import LocationCard from '../Components/LocationCard';
import {endpoints} from '../services/endpoints';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import OneSignal from 'react-native-onesignal';
import {useSelector, useDispatch} from 'react-redux';
import {updateAllProject} from '../actions';
import {run} from 'jest';

const Card1 = props => {
  const {data, loading, numberOfLocation, alerts, warnings, navigation} = props;

  const redirectToAlert = () => {
    const val = {type: 'alerts'};
    navigation.navigate('alert', {alertData: val});
  };

  const redirectToWarning = () => {
    const val = {type: 'warnings'};
    navigation.navigate('alert', {alertData: val});
  };

  return (
    <View style={styles.cardCont} key={props.key}>
      <View style={styles.cardLef}>
        <Text style={styles.crdLefTitl}>North Western</Text>
        <Text style={styles.crdlefTxt}>Railway</Text>
        <Text style={styles.crdlefTxt}>
          No of Locations : {numberOfLocation}
        </Text>
        <View style={styles.alertBx}>
          <TouchableOpacity onPress={redirectToAlert}>
            <Text style={styles.alertTxt}>Alerts : {alerts} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={redirectToWarning}>
            <Text style={styles.alertTxt}>Warnings : {warnings}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardRigh}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Image
            source={require('../../assets/icons/indianRailway.png')}
            style={{width: 60, height: 60, marginTop: -30}}
          />
        )}
      </View>
    </View>
  );
};

const Dashboard = props => {
  const {navigation, route} = props;

  // Handling the notification part here ; --------

  //Method for handling notifications opened;
  
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
    const parsedData = notification?.notification?.additionalData;
    const deviceId = parsedData?.deviceId;
    const projectId = parsedData?.projectId;
    const modeName = parsedData?.Mode;
    const modeId = parsedData?.modeId;
    const deviceName = parsedData?.Equipment;
    const time = parsedData?.Time;
    const deviceOutPut = parsedData?.deviceOutput;

    const val = {
      name: deviceName,
      deviceId: deviceId,
      modeName: modeName,
      modeId: modeId,
      projectId: projectId,
      time: time,
      deviceOutPut: deviceOutPut,
      isNotification: true,
    };

    navigation.navigate('mode', {modeData: val});
  });

  // notification part --------

  const [allProject, setAllProject] = useState([]);
  const [TotalAlerts, setTotalAlerts] = useState('');
  const [allWarnings, setAllWarnings] = useState('');
  const [loading, setLoading] = useState(true);
  const userDetails = SyncStorage.get('userDetails');
  const companyId = route.params?.companyID;
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);

  function subtractHours(numOfHours, date = new Date()) {
    date.setHours(date.getHours() - numOfHours);
    return date;
  }

  const day = new Date();
  var date1 = subtractHours(6).getDate();
  var date2 = day.getDate();
  var month1 = subtractHours(6).getMonth() + 1;
  var month2 = day.getMonth() + 1;
  const year1 = day.getFullYear();
  const year2 = day.getFullYear();

  var hour1 = subtractHours(6).getHours();
  var min1 = subtractHours(6).getMinutes();
  var sec1 = subtractHours(6).getSeconds();

  var hour2 = day.getHours();
  var min2 = day.getMinutes();
  var sec2 = day.getSeconds();

  date1 = date1 < 10 ? `0${date1}` : date1;
  date2 = date2 < 10 ? `0${date2}` : date2;

  month1 = month1 < 10 ? `0${month1}` : month1;
  month2 = month2 < 10 ? `0${month2}` : month2;

  hour1 = hour1 < 10 ? `0${hour1}` : hour1;
  min1 = min1 < 10 ? `0${min1}` : min1;
  sec1 = sec1 < 10 ? `0${sec1}` : sec1;

  hour2 = hour2 < 10 ? `0${hour2}` : hour2;
  min2 = min2 < 10 ? `0${min2}` : min2;
  sec2 = sec2 < 10 ? `0${sec2}` : sec2;

  const startTime =
    year1 +
    '-' +
    month1 +
    '-' +
    date1 +
    'T' +
    hour1 +
    ':' +
    min1 +
    ':' +
    sec1 +
    'Z';
  const endTime =
    year2 +
    '-' +
    month2 +
    '-' +
    date2 +
    'T' +
    hour2 +
    ':' +
    min2 +
    ':' +
    sec2 +
    'Z';

  const projectApi =
    endpoints.getProjects +
    (companyId === ('' || undefined) ? '' : `?companyId=${companyId}`);

  useEffect(() => {
    setLoading(true);

    setAllProject([]);
    axios
      .get(projectApi)
      .then(res => {
        setLoading(false);
        if (res.status == 200) {
          console.log(res, 'response here');
          const val = res.data;
          dispatch(updateAllProject(val));

          // url for getting the number of alerts and warning according to the project ;

          for (var i = 0; i < val.length; i++) {
            const projectId = val[i].projectId;
            const locationData = val[i];

            const url = `${endpoints.alertsNumber}?start_time=${startTime}&end_time=${endTime}&projectId=${projectId}`;

            axios
              .get(url)
              .then(res => {
                if (res.status === 200) {
                  const val = res.data;
                  const data = {...locationData, ...val};

                  setAllProject(itm => {
                    return [...itm, data];
                  });
                }
              })
              .catch(err => {
                console.log(err, 'alert error');
              });
          }
        }
      })
      .catch(err => {
        console.log('ERROR', err);
        setLoading(false);
      });
  }, []);

  const logoutUser = async () => {
    setShowLogout(false);
    await SyncStorage.remove('accessToken');
    await SyncStorage.remove('companyId');
    await SyncStorage.remove('userDetails');
    navigation.navigate('login');
  };

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var date = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hours = dateObj.getHours();
  var minut = dateObj.getMinutes();

  const newdate = date + '/' + month + '/' + year + ' ' + hours + ':' + minut;

  // here we are writing code for getting Total alerts and warning of alerts and warning ;

  const getAllAlerts = () => {
    const url = `${endpoints.alertsNumber}?start_time=${startTime}&end_time=${endTime}`;

    axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          setAllWarnings(res.data.Warnings);
          setTotalAlerts(res.data.Alerts);
        }
      })
      .catch(err => {
        console.log(err, 'this is the error here');
      });
  };

  useEffect(() => {
    getAllAlerts();
  });

  return (
    <View style={styles.container}>
      <View style={styles.profCont}>
        <View>
          <Text style={styles.text}>Last update -{newdate}</Text>
        </View>
        <View style={styles.profIcon}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/googleMap.png')}
              style={styles.gmap}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
            <Image
              source={require('../../assets/icons/profile.png')}
              resizeMode="contain"
              style={styles.user}
            />
          </TouchableOpacity>
          {showLogout === true && (
            <TouchableOpacity
              style={styles.logout}
              onPress={() => logoutUser()}>
              <Text style={styles.logText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Image
        source={require('../../assets/images/dashBack.png')}
        style={styles.dashBack}
      />

      <View style={styles.secCont}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card1
            data={allProject[0]}
            loading={loading}
            numberOfLocation={allProject.length}
            alerts={TotalAlerts}
            warnings={allWarnings}
            {...props}
          />
          <View style={styles.secCont2}>
            {allProject.map((item, index) => {
              return (
                <>
                  {item.projectId != '9iFUV' && (
                    <LocationCard
                      {...props}
                      key={index}
                      item={item}
                      indd={index}
                    />
                  )}
                </>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

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
  title: {
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.black,
  },
  text: {
    marginLeft: '5%',
    fontSize: 15,
    color: Colors.black,
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },

  cardCont: {
    width: '96%',
    alignSelf: 'center',
    backgroundColor: '#edebeb',
    borderRadius: 12,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  cardLef: {
    width: '70%',
  },
  cardRigh: {
    width: '30%',
    alignItems: 'center',
    paddingLeft: 12,
    justifyContent: 'center',
  },

  secCont2: {
    width: '96%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
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
  cardCont2: {
    width: '48%',
    alignSelf: 'center',
    backgroundColor: '#66aafd',
    borderRadius: 12,

    paddingVertical: 17,
    paddingHorizontal: 10,
    marginTop: 18,
  },

  locat: {
    color: 'white',
    marginLeft: 12,
    fontSize: 19,
    fontWeight: 'bold',
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  crdlefTxt: {
    color: Colors.lightBlack,
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 3,
  },
  logout: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: 'white',
    zIndex: 10,
  },
  logText: {
    fontSize: 16,
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 4,
  },

  alertBx: {
    flexDirection: 'row',
  },
  alertTxt: {
    fontSize: 14,
    color: 'white',
    marginVertical: 6,
    marginRight: 9,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#2C4089',
    borderRadius: 8,
  },
});
