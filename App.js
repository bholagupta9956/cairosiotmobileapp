import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Splash from './src/Screens/Splash';
import Login from './src/Screens/Login';
import Device from './src/Screens/Device';
import Dashboard from './src/Screens/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import Parameter from './src/Screens/Parameter';
import Toast from 'react-native-toast-message';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Mode from './src/Screens/Mode';
import SyncStorage from 'sync-storage';
import OneSignal from 'react-native-onesignal';
import PushNotification from 'react-native-push-notification';
import Alert from './src/Screens/Alert';
import SettingScreen from './src/Screens/SettingScreen';
// import StackNavigation from './src/router/StackNavigation';


const data = SyncStorage.init();
const Stack = createNativeStackNavigator();

const App = props => {

  const {navigation} = props;

  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('f23102af-4b19-4df2-870f-4496d741cbb4');

  OneSignal.promptForPushNotificationsWithUserResponse(res => {
    console.log(res, 'response');
  });

  //Method for handling notifications received while app in foreground;

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
     
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);

      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="/" component={Splash} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="dashboard" component={Dashboard} />
          <Stack.Screen name="alert" component={Alert}/>
          <Stack.Screen name="device" component={Device} />
          <Stack.Screen name="parameter" component={Parameter} />
          <Stack.Screen name="mode" component={Mode} />
          <Stack.Screen name="setting" component={SettingScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;

// 26dd85cc-47de-4158-9f70-ffeac74078a0
