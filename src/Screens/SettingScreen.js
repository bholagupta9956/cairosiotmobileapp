// This is the setting screen ;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal ,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../elements/Colors';
import axios from 'axios';
import {endpoints} from '../services/endpoints';
import Icons from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {TextInput} from 'react-native-gesture-handler';
import Button from "../elements/Button"
import SelectBox from '../elements/SelectBox';

const SettingScreen = props => {

  const {navigation, route} = props;

  const projectData = route.params.projectData;
  const projectId = projectData.projectId;
  const deviceId = projectData.deviceId;

  const [deviceDetails, setDeviceDetails] = useState({});
  const [modesData, setModesData] = useState([]);
  const [numberOfModes, setNumberOfModes] = useState(0);
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading , setLoading] = useState(false)

  const getDeviceDetails = () => {
    const url = `${endpoints.getDevice}/${projectId}/devices`;

    axios
      .get(url)
      .then(res => {
        if (res.status == 200) {
          var val = res.data;
          var deviceData = val.filter((itm, ind) => {
            return itm.deviceId == deviceId;
          });
          deviceData = deviceData[0];
          setDeviceDetails(deviceData);
          var modesDta = deviceData?.prametersByModeId;
          setModesData(modesDta);
          setNumberOfModes(modesDta.length);
        }
      })
      .catch(err => {
        console.log(err, 'error response');
      });
  };

  useEffect(() => {
    getDeviceDetails();
  }, []);

  console.log(deviceDetails, 'devicdetails here');

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
          <Text style={styles.text}>Setting</Text>
        </View>
        <View style={styles.profIcon}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Image
              source={require('../../assets/icons/notes.png')}
              style={styles.user}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              source={require('../../assets/icons/profile.png')}
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.firstCont}>
              <Text style={styles.boxTitle}>Edit Equipment Details</Text>
              <View style={styles.inputCont}>
                <Text style={styles.label}>Equipment Name</Text>
                <TextInput style={styles.input} value={deviceDetails?.name} />
              </View>
              <View style={styles.inputCont}>
                <Text style={styles.label}>Equipment Model</Text>
                <TextInput style={styles.input} value={deviceDetails?.model} />
              </View>
              <View style={styles.inputCont}>
                <Text style={styles.label}>Latitude</Text>
                <TextInput style={styles.input} value={deviceDetails?.lat} />
              </View>
              <View style={styles.inputCont}>
                <Text style={styles.label}>Longitude</Text>
                <TextInput style={styles.input} value={deviceDetails?.lng} />
              </View>
              <View style={styles.inputCont}>
                <Text style={styles.label}>Number of Modes</Text>
                <TextInput style={styles.input} value="5" />
              </View>

              <View style={styles.inputCont}>
                <Text style={styles.label}>Maintaince Period</Text>
                <TextInput
                  style={styles.input}
                  value={deviceDetails?.maintenancePeriod}
                />
              </View>
              <View style={styles.inputCont}>
                <Text style={styles.label}>Last Maintaince Date</Text>
                <TextInput
                  style={styles.input}
                  value={deviceDetails?.maintenanceDate}
                />
              </View>
              {/* <View style={styles.inputCont}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Please enter notes"
                />
              </View> */}
            </View>

            <View style={styles.firstCont}>
              <Text style={styles.boxTitle}>Edit Device Parameters</Text>
            </View>
            {modesData.map((itm, ind) => {
              return (
                <>
                  <View style={styles.firstCont}>
                    <Text style={styles.modess}>Mode : {itm.modeId}</Text>
                  </View>
                  <View style={styles.inputCont}>
                    <Text style={styles.label}>Mode Name</Text>
                    <TextInput style={styles.input} value={itm.modeName} />
                  </View>
                  <View style={styles.inputCont}>
                    <Text style={styles.label}>Mode Value</Text>
                    <TextInput style={styles.input} value={itm.modeValue}/>
                  </View>


                {itm.parameters.map((item,indd) =>{
                  return(<>
                      <View style={styles.itemCont}>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Type</Text>
                      <TextInput style={styles.input} value={item.type}/>
                      {/* <SelectBox /> */}
                    </View>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>key</Text>
                      <TextInput style={styles.input} value={item.key}/>
                    </View>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Name</Text>
                      <TextInput style={styles.input} value={item.name}/>
                    </View>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Unit</Text>
                      <TextInput style={styles.input} value={item.unit}/>
                    </View>
                    {/* <View style={styles.inputCont}>
                      <Text style={styles.label}>Init Value</Text>
                      <TextInput style={styles.input} value={item.}/>
                    </View> */}
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Min Value</Text>
                      <TextInput style={styles.input} value={item.minValue}/>
                    </View>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Max Value</Text>
                      <TextInput style={styles.input} value={item.maxValue}/>
                    </View>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Gauge Min Value</Text>
                      <TextInput style={styles.input} value={item.gaugeMinValue}/>
                    </View>
                    <View style={styles.inputCont}>
                      <Text style={styles.label}>Gauge Max Value</Text>
                      <TextInput style={styles.input} value={item.gaugeMaxValue}/>
                    </View>
                  </View>
                    </>)
                })}
                  
                </>
              );
            })}
          </ScrollView>
        </View>
      </View>

       {/* here we are designing modal for the user description */}

       <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        style={styles.modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.descTitl}>Enter Description</Text>
            <TextInput
              multiline
              numberOfLines={6}
              style={styles.inputs}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="useless placeholder"
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.cutOption}
              onPress={() => setOpenModal(false)}>
              <Text style={styles.cut}>X</Text>
            </TouchableOpacity>
            <Button title="submit" isLoading={loading}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgColor,
    position: 'relative',
  },
  profIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secCont: {
    flex: 1,
    backgroundColor: '#7461de',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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

  profCont: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    width: 40,
    height: 40,
    marginHorizontal: 6,
  },

  back: {
    width: 18,
    height: 18,
  },
  gmap: {
    width: 40,
    marginHorizontal: 6,
    height: 40,
  },
  text: {
    marginLeft: '5%',
    fontSize: 22,
    color: '#3e4f9a',
    fontWeight: 'bold',
  },
  dashBack: {
    position: 'absolute',
    zIndex: -1,
    width: '70%',
    right: 0,
    top: 0,
    height: '30%',
  },
  inputCont: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 8,
    paddingVertical: 6,
    fontSize: 16,
    paddingHorizontal: 9,
  },
  firstCont: {},
  boxTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    width: '95%',
    alignSelf: 'center',
    marginVertical: 9,
  },
  modess: {
    width: '95%',
    alignSelf: 'center',
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  itemCont: {
    width: '100%',
    borderWidth: 2,
    marginVertical: 6,
    borderColor: '#3e4f9a',
    borderRadius: 4,
    paddingVertical: 4,
  },

  // here we are desinging the modal design

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8,8,8,0.5)',
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
    fontSize: 16,
    marginBottom: 8,
  },

  textarea: {
    width: '96%',
    height: 200,
    borderWidth: 1,
    borderRadius: 6,
  },
  inputs: {
    fontSize: 20,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderColor : "grey",
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 8,
    marginTop : 8 ,
    paddingVertical: 6,
    fontSize: 16,
    paddingHorizontal: 9,
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
