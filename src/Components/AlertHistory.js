// here we are creating the alert history ;
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {endpoints} from '../services/endpoints';
import axios from 'axios';
import {Colors} from '../elements/Colors';
import TimePicker from './Modal/TimePicker';

const AlertHistory = props => {

   const {projectId, deviceName, deviceId, modeName, modeId, params , startTime , endTime , setStartTime , setEndTime  , openModal , setOpenModal} = props;

   var date1 = startTime.getDate();
  var date2 = endTime.getDate();
  var month1 = startTime.getMonth() + 1;
  var month2 = endTime.getMonth() + 1;
  const year1 = startTime.getFullYear();
  const year2 = endTime.getFullYear();
  const hour = endTime.getHours();
  const min = endTime.getMinutes();
  const sec = endTime.getSeconds();

  date1 = date1 < 10 ? `0${date1}` : date1;
  date2 = date2 < 10 ? `0${date2}` : date2;

  month1 = month1 < 10 ? `0${month1}` : month1;
  month2 = month2 < 10 ? `0${month2}` : month2;

  const strtTime =
    year1 + '-' + month1 + '-' + date1 + 'T' + hour + ':' + min + ':' + sec;

  const enddTime =
    year2 + '-' + month2 + '-' + date2 + 'T' + hour + ':' + min + ':' + sec;


  const [allAlerts, setAllAlerts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 

  const url = `${endpoints.getAlerts}?deviceId=${deviceId}&start_time=${strtTime}&end_time=${enddTime}`;

  console.log(url , "url")
 
  const getAlerts = () => {
    setIsLoading(true);
    axios
      .get(url)
      .then(res => {
        if (res.status == 200) {
          const val = res.data;

          setIsLoading(false)
          const filterAlerts = val.filter(itm => {
            return itm.modeId === modeId;
          });

          if (filterAlerts.length === 0) {
            setIsLoading(false);
            setErrorMsg('Sorry , No alerts available on this mode');
          } else {
            setErrorMsg('');
          }

          setAllAlerts(filterAlerts);
        }
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err, 'this is the error ');
      });
  };

  useEffect(() => {
    getAlerts();
  }, []);

  const handleSubmit = () =>{
    getAlerts();
  }

  return (
    <View style={styles.container}>
      {allAlerts.length != 0 &&
        allAlerts.map((item, index) => {
          var status = item?.isAlert === true ? 'alert' : 'warning';
          var timestamp = item?.timestamp;
          timestamp = timestamp.substr(11,18);
          timestamp = timestamp.replace("Z" , "")
          console.log(timestamp , "timestamps here")
          return (
            <>
              <View
                style={[
                  styles.box,
                  {borderColor: status == 'alert' ? 'red' : '#e8b425'},
                ]}
                key={index}>
                <View style={styles.titlecont}>
                  <Text style={styles.title}>TimeStamps</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.data}>{timestamp}</Text>
                </View>
                <View style={styles.titlecont}>
                  <Text style={styles.title}>Device Name</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.data}>{modeName}</Text>
                </View>
                <View style={styles.box2}>
                  {item.parameters &&
                    item.parameters.map((itm, index) => {
                      console.log(itm , "itm")
                      return (
                        <>
                          {status == 'alert' && itm.isAlert === true && (
                            <View style={styles.paramCont}>
                              <Text style={styles.title2}>{itm.name}</Text>
                              <Text style={styles.colon2}>:</Text>
                              <Text style={styles.data2}>{itm.value}</Text>
                            </View>
                          )}
                          {status == 'warning' && itm.isWarning === true && (
                            <View style={styles.paramCont}>
                              <Text style={styles.title2}>{itm.name}</Text>
                              <Text style={styles.colon2}>:</Text>
                              <Text style={styles.data2}>{itm.value}</Text>
                            </View>
                          )}
                        </>
                      );
                    })}
                </View>
              </View>
            </>
          );
        })}

      {isLoading && <ActivityIndicator size="large" color="#3b46e3" />}
      {errorMsg && <Text style={{fontSize: 17}}>{errorMsg}</Text>}

       {/* Here we adding timePicker Modal */}
       <TimePicker openModal={openModal} setOpenModal={setOpenModal} setStartTime={setStartTime} setEndTime={setEndTime} startTime={startTime} endTime={endTime} handleSubmit={handleSubmit}/>


    </View>
  );
};

export default AlertHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    width: '108%',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 12,
    marginLeft: '-4%',
    marginBottom: 12,
  },
  titlecont: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: 'bold',
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
});
