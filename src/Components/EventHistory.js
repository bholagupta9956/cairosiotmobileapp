// here we are creating event history ;

import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {endpoints} from '../services/endpoints';
import axios from 'axios';
import LineGraph from './LineGraph';
import TimePicker from './Modal/TimePicker';


const EventHistory = props => {

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

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allDatas, setAllDatas] = useState([]);
 

  
  const url = `${endpoints.getEvents}${projectId}/device/${deviceId}/event?start_time=${strtTime}&end_time=${enddTime}`;


  const getEvents = () => {

    setIsLoading(true);
    setAllDatas([]);
    var allData = [];

    axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          const val = res.data;
          const events = val.filter(itm => {
            return itm.modeId === modeId;
          });

          const filterEvents = events.reverse();

          if (filterEvents.length === 0) {
            setIsLoading(false);
            setErrorMsg('Sorry , No events available on this mode');
          } else {
            setErrorMsg('');
          }

          const filterEventsLength =
            filterEvents.length > 10 ? 10 : filterEvents.length;

          for (var i = 0; i < filterEventsLength; i++) {
            const events = filterEvents[i];
            var timestamp = events?.timestamp;
            timestamp = timestamp.substr(11,18);
            timestamp = timestamp.replace("Z" , "")
            console.log(timestamp , "timestamps here")
            const parameters = events?.parameters;
          
            for (var l = 0; l < parameters.length; l++) {
              const val = parameters[l];
              const key = val?.key;
              const value = val?.value;
              const filterParam = params.filter(itm => {
                return itm.key === key;
              });

              const paramName = filterParam[0]?.name;

              if (filterParam.length != 0 && key != '010') {
                if (allData.some(data => data.key === key)) {
                  const filteredData = allData.filter(itt => {
                    return itt.key != key;
                  });

                  const selectedKeyData = allData.filter(itt => {
                    return itt.key == key;
                  });

                  const selectedKey = selectedKeyData[0]?.key;
                  const selectedValue = selectedKeyData[0]?.value;
                  const selectedTime = selectedKeyData[0]?.time;

                  allData = [
                    ...filteredData,
                    {
                      key: selectedKey,
                      value: [...selectedValue, value],
                      name: paramName,
                      time: [...selectedTime, timestamp],
                    },
                  ];
                } else {
                  allData = [
                    ...allData,
                    {
                      key: key,
                      value: [value],
                      name: paramName,
                      time: [timestamp],
                    },
                  ];
                }
              }

              setAllDatas(allData);
              setIsLoading(false);
            }
          }
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err, 'this is the error');
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSubmit = () =>{
    getEvents();
  }


  return (
    <View>
      {allDatas.map((ele, index) => {
        return (
          <>
            <LineGraph
              name={ele.name}
              key={index}
              label={ele.time}
              value={ele.value}
              keyName={ele.name}
            />
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

export default EventHistory;
