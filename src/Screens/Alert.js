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
import {endpoints} from '../services/endpoints';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectList from 'react-native-dropdown-select-list';
import {useSelector} from 'react-redux';

const SelectLocation = props => {

  const {navigation, route} = props;
  const [selected, setSelected] = React.useState('');
  const [allProjects, setAllProjects] = useState([]);
  const project = useSelector(state => state.getAllProject.project);

  useEffect(() => {
    for (var i = 0; i < project.length; i++) {
      const projectId = project[i].projectId;
      const projectName = project[i].name;

      const val = {
        key: projectId,
        value: projectName,
      };

      setAllProjects(itm => {
        return [...itm, val];
      });
      setSelected(projectName);
    }
  }, [project]);

  const data = [
    {key: '0', value: 'All'},
    {key: '1', value: 'Jammu & Kashmir'},
    {key: '2', value: 'Gujrat'},
    {key: '3', value: 'Maharashtra'},
    {key: '4', value: 'Goa'},
  ];

  return (
    <>
      <SelectList
        data={allProjects}
        onSelect={() => setSelected(selected)}
        setSelected={setSelected}
      />
    </>
  );
};

const Alert = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [allAlerts, setAllAlerts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allWarnings, setAllWarnings] = useState([]);
  const {navigation, route} = props;
  const [events, setEvents] = useState('alerts');

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

  const alertData = route.params?.alertData;

  const getAlertsByProject = data => {
    const projectId = data?.projectId;

    // const url = projectId ? `${endpoints.getAlertsByProject}projectId=${projectId}&start_time=${startTime}&end_time=${endTime}` : `${endpoints.getAlertsByProject}&start_time=${startTime}&end_time=${endTime}`
    const url = `${endpoints.getAlertsByProject}&start_time=${startTime}&end_time=${endTime}`;

    console.log(url , "url");

    setIsLoading(true);

    const type = data?.type;

    if (type === 'alerts') {
      setEvents('alerts');
    } else if (type === 'warnings') {
      setEvents('warnings');
    }

    axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          setIsLoading(false);
          const val = res.data;
          var alerts = val.filter(itm => {
            return itm?.isAlert === true;
          });

          console.log(alerts, 'alerts');

          alerts = alerts.reverse();
          alerts = alerts.slice(0, 100);

          var warnings = val.filter(itm => {
            return itm?.isWarning === true;
          });

          warnings = warnings.reverse();
          warnings = warnings.slice(0, 100);

          setAllData(val);
          setAllAlerts(alerts);
          setAllWarnings(warnings);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err, 'error here');
      });
  };

  useEffect(() => {
    getAlertsByProject(alertData);
  }, [alertData]);

  // handling redirection to alert history ;

  const redirectToAlertHistory = data => {
    const val = {
      name: data?.Equipment,
      deviceId: data?.deviceId,
      modeName: data?.Mode,
      modeId: data.modeId,
      projectId: data.projectId,
      time: data.timestamp,
      deviceOutPut: data.parameters,
      isNotification: true,
    };
    navigation.navigate('mode', {modeData: val});
  };

  return (
    <View style={styles.container}>
      <View style={styles.profCont}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backCont}>
          <Image
            source={require('../../assets/icons/backArrow.png')}
            style={styles.back}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.projectCont}>
          <SelectLocation {...props} />
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
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={() => setEvents('alerts')}>
            <Text
              style={[
                styles.headerText,
                {
                  backgroundColor: events === 'alerts' ? '#494cf2' : 'white',
                  color: events === 'alerts' ? 'white' : '#494cf2',
                },
              ]}>
              Alert
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEvents('warnings')}>
            <Text
              style={[
                styles.headerText,
                {
                  backgroundColor: events === 'warnings' ? '#494cf2' : 'white',
                  color: events === 'warnings' ? 'white' : '#494cf2',
                },
              ]}>
              Warning
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {events === 'alerts' &&
            allAlerts.map((itm, ind) => {
              var timestamp = itm?.timestamp;
            timestamp = timestamp.substr(11,18);
            timestamp = timestamp.replace("Z" , "")
            console.log(timestamp , "timestamps here")
              return (
                <>
                  <TouchableOpacity onPress={() => redirectToAlertHistory(itm)}>
                    <View style={styles.altCont}>
                      <View style={[styles.box]}>
                        <View style={styles.titlecont}>
                          <Text style={styles.title}>TimeStamps</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.data}>{timestamp}</Text>
                        </View>
                        <View style={styles.titlecont}>
                          <Text style={styles.title}>Device Name</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.data}>{itm.Mode}</Text>
                        </View>
                        <View style={styles.titlecont}>
                          <Text style={styles.title}>Equipment</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.data}>{itm?.Equipment}</Text>
                        </View>
                        <View style={styles.box2}>
                          {itm.parameters &&
                            itm.parameters.map((itt, index) => {
                              var dta = itt.value - itt.maxValue;
                              var variation = (dta / itt.maxValue) * 100;
                              return (
                                <>
                                  {itt.isAlert && itt.key != '010' && (
                                    <View style={styles.paramCont}>
                                      <View style={styles.paramContBox}>
                                      <Text style={styles.title2}>
                                        {itt.name}
                                      </Text>
                                      <Text style={styles.colon2}>:</Text>
                                      <Text style={styles.data2}>
                                        {itt.value}
                                      </Text>
                                      </View>
                                      <Text
                                        style={{
                                          marginHorizontal: 9,
                                          fontSize: 16,
                                        }}>
                                        ,
                                      </Text>
                                      <View style={styles.paramContBox}>
                                      
                                      <Text style={styles.title2}>Max</Text>
                                      <Text style={styles.colon2}>:</Text>
                                      <Text style={styles.data2}>
                                        {itt.maxValue}
                                      </Text>
                                      </View>
                                      <Text
                                        style={{
                                          marginHorizontal: 9,
                                          fontSize: 16,
                                        }}>
                                        ,
                                      </Text>
                                      <View style={styles.paramContBox}>
                                     
                                      <Text style={styles.title2}>Var</Text>
                                      <Text style={styles.colon2}>:</Text>
                                      <Text style={styles.data2}>
                                        {Math.round(variation)} %
                                      </Text>
                                      </View>
                                    </View>
                                  )}
                                </>
                              );
                            })}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })}

          {events === 'alerts' && isLoading && (
            <ActivityIndicator size="large" color="#3b46e3" />
          )}
          {events === 'alerts' && errorMsg && (
            <Text style={{fontSize: 17}}>errorMsg</Text>
          )}

          {events === 'warnings' &&
            allWarnings.map((itm, ind) => {
              var timestamp = itm?.timestamp;
            timestamp = timestamp.substr(11,18);
            timestamp = timestamp.replace("Z" , "")
            console.log(timestamp , "timestamps here")
              return (
                <>
                  <TouchableOpacity onPress={() => redirectToAlertHistory(itm)}>
                    <View style={styles.altCont}>
                      <View style={[styles.box, {borderColor: '#e8b425'}]}>
                        <View style={styles.titlecont}>
                          <Text style={styles.title}>TimeStamps</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.data}>{timestamp}</Text>
                        </View>
                        <View style={styles.titlecont}>
                          <Text style={styles.title}>Device Name</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.data}>{itm.Mode}</Text>
                        </View>
                        <View style={styles.titlecont}>
                          <Text style={styles.title}>Equipment</Text>
                          <Text style={styles.colon}>:</Text>
                          <Text style={styles.data}>{itm?.Equipment}</Text>
                        </View>
                        <View style={styles.box2}>
                          {itm.parameters &&
                            itm.parameters.map((itt, index) => {
                              var dta = itt.value - itt.maxValue;
                              var variation = (dta / itt.maxValue) * 100;
                              return (
                                <>
                                  {itt.isWarning && itt.key != '010' && (
                                    <View style={styles.paramCont}>
                                      <View style={styles.paramContBox}>
                                        <Text style={styles.title2}>
                                          {itt.name}
                                        </Text>
                                        <Text style={styles.colon2}>:</Text>
                                        <Text style={styles.data2}>
                                          {itt.value}
                                        </Text>
                                      </View>
                                      <Text
                                          style={{
                                            marginHorizontal: 9,
                                            fontSize: 16,
                                          }}>
                                          ,
                                        </Text>
                                      <View style={styles.paramContBox}>
                                        
                                        <Text style={styles.title2}>Max</Text>
                                        <Text style={styles.colon2}>:</Text>
                                        <Text style={styles.data2}>
                                          {itt.maxValue}
                                        </Text>
                                      </View>
                                      <Text
                                          style={{
                                            marginHorizontal: 9,
                                            fontSize: 16,
                                          }}>
                                          ,
                                        </Text>
                                      <View style={styles.paramContBox}>
                                        
                                        <Text style={styles.title2}>Var</Text>
                                        <Text style={styles.colon2}>:</Text>
                                        <Text style={styles.data2}>
                                          {Math.round(variation)} %
                                        </Text>
                                      </View>
                                    </View>
                                  )}
                                </>
                              );
                            })}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })}

          {events === 'warnings' && isLoading && (
            <ActivityIndicator size="large" color="#3b46e3" />
          )}
          {events === 'warnings' && errorMsg && (
            <Text style={{fontSize: 17}}>errorMsg</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Alert;

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
  profIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    width: 40,
    height: 40,
    marginHorizontal: 6,
  },
  profCont: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  secCont: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  altCont: {
    flex: 1,
    justifyContent: 'center',
  },
  back: {
    width: 18,
    height: 18,
    marginLeft: -13,
  },

  box: {
    width: '100%',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: 'red',
  },
  titlecont: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 17,

    width: '40%',
  },
  colon: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 9,
  },

  data: {
    color: Colors.black,
    fontSize: 15,
  },

  paramCont: {
    marginVertical: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    marginHorizontal: 6,
    paddingHorizontal: 6,
    flexWrap: 'wrap',
    alignItems : "flex-end"
  },

  paramContBox :{
    flexDirection : "row" ,
    marginTop : 8
  },

  title2: {
    color: Colors.black,
    fontSize: 15,
    marginRight: 4,
  },
  colon2: {
    color: Colors.black,
    fontSize: 15,

    marginRight: 9,
  },
  data2: {
    color: Colors.black,
    fontSize: 15,
  },
  box2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  search: {
    width: 18,
    height: 18,
  },

  projectCont: {
    position: 'absolute',
    top: 15,
    left: '10%',
    zIndex: 11,
    backgroundColor: 'white',
    minWidth: 160,
  },

  headerCont: {
    flexDirection: 'row',
    // backgroundColor : "#7461de" ,
    paddingVertical: 15,
    justifyContent: 'space-evenly',
  },
  headerText: {
    color: 'white',
    fontSize: 17,
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: 'red',
    borderRadius: 20,
    minWidth: '40%',
    textAlign: 'center',
    borderColor: '#7461de',
    borderWidth: 2,
  },
});
