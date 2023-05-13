import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="/" component={Splash} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="dashboard" component={Dashboard} />
          <Stack.Screen name="alert" component={Alert}/>
          <Stack.Screen name="device" component={Device} />
          <Stack.Screen name="parameter" component={Parameter} />
          <Stack.Screen name="mode" component={Mode} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigation