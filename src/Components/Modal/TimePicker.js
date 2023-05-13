// From this modal we will pick time easily ;

import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image ,
  
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../elements/Colors';
import DatePicker from 'react-native-date-picker';
import Button from '../../elements/Button';
import Edit from "../../../assets/icons/edit.png";


const TimePicker = (props) => {

  const {openModal, setOpenModal ,setStartTime ,setEndTime , endTime ,  startTime , handleSubmit} = props;

  const [date, setDate] = useState(startTime);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateType , setDateType] = useState("start");

  var date1 = startTime.getDate();
  var date2 = endTime.getDate();
  var month1 = startTime.getMonth() + 1;
  var month2 = endTime.getMonth() + 1;
  const year1 = startTime.getFullYear();
  const year2 = endTime.getFullYear();
  var hour1 = startTime.getHours();
  var min1 = startTime.getMinutes();
  var sec1 = startTime.getSeconds();
  var hour2 = endTime.getHours();
  var min2 = endTime.getMinutes();
  var sec2 = endTime.getSeconds();

  date1 = date1 < 10 ? `0${date1}` : date1;
  date2 = date2 < 10 ? `0${date2}` : date2;

  month1 = month1 < 10 ? `0${month1}` : month1;
  month2 = month2 < 10 ? `0${month2}` : month2;

  hour1 = hour1 < 10 ? `0${hour1}` : hour1 ;
  hour2 = hour2 < 10 ? `0${hour2}` : hour2 ;
  min1 = min1 < 10 ? `0${min1}` : min1 ;
  min2 = min2 < 10 ? `0${min2}` : min2 ;
  sec1 = sec1 < 10 ? `0${sec1}` : sec1 ;
  sec2 = sec2 < 10 ? `0${sec2}` : sec2 ;



  const strtTime =
    year1 + '-' + month1 + '-' + date1 + ' ' + hour1 + ':' + min1 + ':' + sec1;

  const enddTime =
    year2 + '-' + month2 + '-' + date2 + ' ' + hour2 + ':' + min2 + ':' + sec2;


  const handleStartDate = () =>{
    // setOpenModal(false)
    setOpenDatePicker(true)
    setDateType("start")
  }

  const handleEndDate = () =>{
    // setOpenModal(false)
    setOpenDatePicker(true)
    setDateType("end")
  }

  const handleUpdateDate = (dte) =>{
    if(dateType === "start"){
      setStartTime(dte)
      setDate(startTime)
    }
    else if(dateType === "end"){
      setEndTime(dte)
      setDate(endTime)
    }
    setOpenDatePicker(false)
  }

  const submit = () =>{
    setOpenModal(false)
    handleSubmit()
  }


  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        style={styles.modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.descTitl}>Time</Text>

            <TouchableOpacity
              style={styles.cutOption}
              onPress={() => setOpenModal(false)}>
              <Text style={styles.cut}>X</Text>
            </TouchableOpacity>

            <View style={styles.timeCont}>
              <Text style={styles.timeTxt}>Start Time</Text>
              <View style={styles.timeCont2}>
                <Text style={styles.time}>{strtTime}</Text>
                <TouchableOpacity onPress={handleStartDate}>
                <Image source={require("../../../assets/icons/edit.png")} style={styles.edit}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.timeCont}>
              <Text style={styles.timeTxt}>End Time</Text>
              <View style={[styles.timeCont2 ]}>
                <Text style={styles.time}>{enddTime}</Text>
                <TouchableOpacity onPress={handleEndDate}>
                <Image source={require("../../../assets/icons/edit.png")} style={styles.edit}/>
                </TouchableOpacity>
              </View>
            </View>
             <Button title="Submit" onPress={submit}/>
          </View>
        </View>
      </Modal>

      {/* date and time picker */}

      <DatePicker
        modal
        open={openDatePicker}
        date={date}
        onConfirm={date => handleUpdateDate(date)}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />

    </>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8,8,8,0.5)',
  },
  btn : {
    width : "100%" ,
    paddingVertical : 8 ,
    marginVertical : 4 ,
    justifyContent : 'center' ,
    alignItems : "center" ,
    borderRadius : 23 ,
    backgroundColor : Colors.primary
  },

  timeCont: {
    width: "100%",
  }, 
  time : {
    fontSize : 16  ,
    color : Colors.black
  },
  timeCont2 :{
    flexDirection : "row" ,
    paddingVertical : 9 ,
    paddingHorizontal : 9 ,
    alignItems : "center" ,
    borderRadius : 6 ,
    justifyContent : "space-between" ,
    marginVertical : 6 ,
    borderWidth : 1 
  },
  timeTxt : {
    color : Colors.black ,
    fontWeight :"bold"
  },
  edit :{
    width : 20 ,
    height : 20
  },
  timeTxt : {
    fontSize : 18 ,
    color : Colors.black
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  descTitl: {
    color: Colors.black,
    fontSize: 15,
    marginBottom: 8,
  },

  textarea: {
    width: '96%',
    height: 200,
    borderWidth: 1,
    borderRadius: 6,
  },
  input: {
    margin: 8,
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  cutOption: {
    position: 'absolute',
    right: 20,
    top: 8,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cut: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },

});
