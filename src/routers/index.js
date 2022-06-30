import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Login, Home} from '../screens';

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
export default Routers;
