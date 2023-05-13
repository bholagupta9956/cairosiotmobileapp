import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../elements/Colors';
import AlertHistory from '../Components/AlertHistory';
import EventHistory from '../Components/EventHistory';
import { createIconSetFromFontello } from 'react-native-vector-icons';


const Card = props => {

  const {paramss} = props;

  return (
    <>
      <View style={styles.cardCont2}>
        <Text style={styles.crdlefTitle}>{paramss.name}</Text>
        <Text style={styles.crdlefTxt}> Unit : {paramss.unit}</Text>
        {/* <Text style={styles.crdlefTxt}> device : {paramss.deviceName}</Text> */}
        <Text style={styles.crdlefTxt}> Value : {paramss.value}</Text>
      </View>
    </>
  );
};

const Parameter = props => {

  // here we are getting current date and time ;

  function subtractDate(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    return date;
  }

  const day = new Date();

  const strtTime = subtractDate(1);
  const enddTime = day;


  const {navigation, route} = props;
  const parameters = route.params?.data;
  const [paramsData, setParamsData] = useState([]);
  const [events, setEvents] = useState('liveUpdates');
  const [startTime , setStartTime] = useState(strtTime);
  const [endTime , setEndTime] = useState(enddTime);
  const [openModal , setOpenModal] = useState(false);

 // here we are checking if it is a notification;

  useEffect(() =>{
    if(parameters?.isNotification && parameters?.isNotification === true){
      setEvents("alertHistory")
    }
  },[])


  useEffect(() => {

    setParamsData([]);
    for (var i = 0; i < parameters.parameters.length; i++) {
      const key = parameters.parameters[i].key;
      const pmDat = parameters.params.filter((itm, index) => {
        return itm.key == key;
      });

      const pmData = pmDat[0];

      const val = {
        name: parameters.parameters[i].name,
        type: parameters.parameters[i].type,
        unit: parameters.parameters[i].unit,
        key: parameters.parameters[i].key,
        value: pmDat.length != 0 ? pmData.value : 0,
        maxValue: parameters.parameters[i].maxValue,
        deviceName: parameters.deviceName,
      };

      setParamsData(itm => {
        return [...itm, val];
      });

    }
  }, [parameters]);


  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var date = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hours = dateObj.getHours();
  var minut = dateObj.getMinutes();

  const newdate = date + '/' + month + '/' + year + ' ' + hours + ':' + minut;

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
          <Text style={styles.text}>
            {parameters.deviceName} {parameters.modeName}
          </Text>
        </View>
        <View style={styles.profIcon}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Image
              source={require('../../assets/icons/time.png')}
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
          <TouchableOpacity onPress={() => setEvents('liveUpdates')}>
            <Text
              style={[
                styles.headerText,
                {
                  backgroundColor:
                    events === 'liveUpdates' ? 'white' : '#494cf2',
                  color: events === 'liveUpdates' ? '#494cf2' : 'white',
                },
              ]}>
              Live Update
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEvents('eventHistory')}>
            <Text
              style={[
                styles.headerText,
                {
                  backgroundColor:
                    events === 'eventHistory' ? 'white' : '#494cf2',
                  color: events === 'eventHistory' ? '#494cf2' : 'white',
                },
              ]}>
              Event History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEvents('alertHistory')}>
            <Text
              style={[
                styles.headerText,
                {
                  backgroundColor:
                    events === 'alertHistory' ? 'white' : '#494cf2',
                  color: events === 'alertHistory' ? '#494cf2' : 'white',
                },
              ]}>
              Alert History
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.devic}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            <View style={styles.params}>


            {events === "liveUpdates" &&   <Text style={{fontSize : 16 , color : Colors.lightBlack , fontWeight : "bold"}}>Last update - {newdate}</Text>}

              {events === 'liveUpdates' &&
                paramsData.map((item, index) => {
                  return (
                    <>
                      {item.key !== '010' && (
                        <Card paramss={item} key={index} />
                      )}
                    </>
                  );
                })}

              {events === 'alertHistory' && (
                <AlertHistory
                deviceId={parameters.deviceId}
                deviceName={parameters.deviceName}
                modeName={parameters.modeName}
                modeId={parameters.modeId}
                projectId={parameters.projectId}
                params={parameters?.parameters}
                startTime={startTime}
                endTime={endTime}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                openModal={openModal}
                setOpenModal={setOpenModal}
                />
              )}

              {events === 'eventHistory' && (
                <EventHistory
                  deviceId={parameters.deviceId}
                  deviceName={parameters.deviceName}
                  modeName={parameters.modeName}
                  modeId={parameters.modeId}
                  projectId={parameters.projectId}
                  params={parameters?.parameters}
                  startTime={startTime}
                  endTime={endTime}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};


export default Parameter;

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
    paddingVertical: 5,
    backgroundColor: '#8877e3',
    minWidth: '45%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 8,
    textAlign: 'center',
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
    width: '100%',
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 10,
    marginTop: 18,
    borderWidth: 1,
    borderColor: 'red',
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
  params: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: '100%',
  },
  pramItem: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  text1: {
    fontSize: 23,
    fontWeight: 'bold',
    width: '40%',
    marginLeft: 9,
  },
  text2: {
    fontSize: 23,
    fontWeight: 'bold',
    width: '12%',
    marginLeft: 9,
  },
  text3: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 9,
  },
  volttimg: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  back: {
    width: 23,
    height: 23,
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
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  crdlefTxt: {
    color: Colors.lightBlack,
    fontWeight: '500',
    fontSize: 16,
    paddingVertical: 3,
  },

  cardCont2: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 18,
    backgroundColor: '#D8EFFF',
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  back: {
    width: 18,
    height: 18,
  },

  profIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  crdlefTitle: {
    color: Colors.lightBlack,
    fontSize: 23,
    fontWeight: 'bold',
  },

  text: {
    marginLeft: '5%',
    fontSize: 22,
    color: '#3e4f9a',
    fontWeight: 'bold',
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

  headerCont: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-evenly',
  },
  headerText: {
    color: Colors.lightBlack,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});
