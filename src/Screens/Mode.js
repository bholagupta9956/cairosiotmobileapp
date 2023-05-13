import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {endpoints} from '../services/endpoints';
import Icons from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {Colors} from '../elements/Colors';


const Card = props => {

  const {navigation, modesDta, status , projectId} = props;

  const vall = {
    params: modesDta.params,
    parameters: modesDta.parameters,
    deviceName: modesDta.deviceName,
    modeName: modesDta.modeName,
    modeId: modesDta.modeId,
    deviceId: modesDta.deviceId,
    projectId : projectId
  };



  const goToParams = parameters => {
    if (parameters) {
      navigation.navigate('parameter', {data: vall});
    } else {
      Toast.show({
        type: 'info',
        text1: 'Warning',
        text2: 'Sorry , No params available !',
      });
    }
  };

  return (
    <>
      {status == 'alert' ? (
        <View
          style={[
            styles.cardCont2,
            {borderColor: status === 'alert' ? 'red' : 'grey'},
          ]}>
          <TouchableOpacity onPress={() => goToParams(modesDta?.parameters)}>
            <Image
              source={require('../../assets/icons/mode.png')}
              style={styles.iotImg}
              resizeMode="contain"
            />
            <Text style={[styles.devName, {fontWeight: 'bold'}]}>
              {modesDta?.modeName ? modesDta?.modeName : 'Nan'}
            </Text>
            <Text style={styles.devName}>
              No of params :{' '}
              {modesDta?.parameters?.length ? modesDta?.parameters?.length : 0}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.cardCont2,
            {borderColor: status === 'alert' ? 'red' : 'grey'},
          ]}>
          <TouchableOpacity onPress={() => goToParams(modesDta?.parameters)}>
            <Image
              source={require('../../assets/icons/mode.png')}
              style={styles.iotImg}
              resizeMode="contain"
            />
            <Text style={[styles.devName, {fontWeight: 'bold'}]}>
              {modesDta?.modeName ? modesDta?.modeName : 'Nan'}
            </Text>
            <Text style={styles.devName}>
              No of params :{' '}
              {modesDta?.parameters?.length ? modesDta?.parameters?.length : 0}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {status == 'warning' && (
        <View
          style={[
            styles.cardCont2,
            {borderColor: status === 'alert' ? 'red' : 'grey'},
          ]}>
          <TouchableOpacity onPress={() => goToParams(modesDta?.parameters)}>
            <Image
              source={require('../../assets/icons/mode.png')}
              style={styles.iotImg}
              resizeMode="contain"
            />
            <Text style={[styles.devName, {fontWeight: 'bold'}]}>
              {modesDta?.modeName ? modesDta?.modeName : 'Nan'}
            </Text>
            <Text style={styles.devName}>
              No of params :{' '}
              {modesDta?.parameters?.length ? modesDta?.parameters?.length : 0}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const Mode = props => {

  const {route, navigation} = props;
  const modes = route.params.modeData;
  const projectId = modes.projectId;
  const deviceId = modes.deviceId;
  const url = endpoints.getDeviceDetails + `/${projectId}/device/${deviceId}`;
  const [allModes, setAllModes] = useState([]);
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    axios
      .get(url)
      .then(res => {  
        if (res.status == 200) {
          const vall = res.data[0];
          
          const projectId = vall.projectId;
          setAllModes([]);

          var alllModes = []

          for (var i = 0; i < vall.latestDataByModeId.length; i++) {

            const otherData = vall?.prametersByModeId[i];
            const keyId = vall?.latestDataByModeId[i].parameters;
            const isAlert = vall?.latestDataByModeId[i]?.isAlert;
            const isWarning = vall?.latestDataByModeId[i]?.isWarning;
            const modeId = vall?.latestDataByModeId[i].modeId;
            const parametersDetails = vall?.prametersByModeId[i]?.parameters;

            const val = {
              params: keyId,
              deviceName: vall.name,
              isAlert: isAlert,
              isWarning: isWarning,
              projectId: projectId,
              ...otherData,
            };

            setAllModes(itm => {
              return [...itm, val];
            });

            alllModes.push(val)

            // here we are checking alert and notfication;

            if(modes?.isNotification && modes?.isNotification === true){
               if(modes.modeId === modeId){
                const vall = {
                  params: val.params,
                  parameters: val.parameters,
                  deviceName: val.deviceName,
                  modeName: val.modeName,
                  modeId: val.modeId,
                  deviceId: val.deviceId,
                  projectId : modes.projectId,
                  isNotification : true 
                };
              
                navigation.navigate("parameter" , {data : vall})
               }
            }
          }

        }
      })
      .catch(err => {
        console.log(err, 'error');
      });
  }, []);

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  const newdate = day + '/' + month + '/' + year;

  const handleSettingScreen = () =>{
   const  projectData = {
      projectId : projectId ,
      deviceId : deviceId
    }

    navigation.navigate("setting" , {projectData : projectData})
  }
 
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
          <Text style={styles.text}>{modes.name}</Text>
        </View>
        <View style={styles.profIcon}>
          <TouchableOpacity  onPress={() => handleSettingScreen()}>
            <Image
              source={require('../../assets/icons/setting.png')}
              style={styles.notes}
            />
          </TouchableOpacity>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              {allModes.map((item, index) => {

                var status = null;
                var alert = item?.isAlert === true ? true : null;
                var warning = item?.isWarning === true ? true : null;

                if (alert) {
                  status = 'alert';
                } else if (warning) {
                  status = 'warning';
                } else {
                  status = null;
                }
                return (
                  <>
                    <Card
                      modesDta={item}
                      key={index}
                      {...props}
                      status={status}
                      projectId={item.projectId}
                    />
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

export default Mode;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgColor,
    position: 'relative',
  },
  notes : {
    width : 40 ,
    height : 40 ,
    marginRight : 6
  },

  user: {
    width: 40,
    height: 40,
    marginHorizontal: 6,
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
  profIcon: {
    flexDirection: 'row',
    alignItems: 'center',
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
