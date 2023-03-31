import { View, Text,Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Home from './Home'
import Cart from './Cart';
import Products from './Products';
import User from './User';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({focused})=>(
          <Image source={focused ? require('../assets/img/home2.png') : require('../assets/img/home1.png')} style={{width:30,height:30}} resizeMode="stretch" />
        )
      }}/>
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}

const Body = () => {
  return (
    // <Home/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeTabs" component={MyTabs} />
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Body