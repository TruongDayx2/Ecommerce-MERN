import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {Provider} from 'react-redux'
import React from "react";
import Home from "./Home";
import Cart from "./Cart";
import Products from "./Products";
import User from "./User";
import Login from "./Login";
import SignUp from "./SignUp";
import DisplayStart from "./DisplayStart";
import Shop from "./Shop";
import ForgotPassword from "./ForgotPW";
import { useSelector } from "react-redux";
import Otp from "./Otp";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarInactiveTintColor: "#697473",
          tabBarActiveTintColor: "#289B94",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/img/home2.png")
                  : require("../assets/img/home1.png")
              }
              style={{ width: 30, height: 30 }}
              resizeMode="stretch"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarInactiveTintColor: "#697473",
          tabBarActiveTintColor: "#289B94",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/img/shop2.png")
                  : require("../assets/img/shop1.png")
              }
              style={{ width: 30, height: 30 }}
              resizeMode="stretch"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarInactiveTintColor: "#697473",
          tabBarActiveTintColor: "#289B94",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/img/bag2.png")
                  : require("../assets/img/bag1.png")
              }
              style={{ width: 30, height: 30 }}
              resizeMode="stretch"
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarInactiveTintColor: "#697473",
          tabBarActiveTintColor: "#289B94",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/img/user2.png")
                  : require("../assets/img/user1.png")
              }
              style={{ width: 30, height: 30 }}
              resizeMode="stretch"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const Body = () => {
  const user = useSelector((state)=>state.user.currentUser)

  return (
    // <Home/>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DisplayStart"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="DisplayStart" component={DisplayStart} />
        <Stack.Screen name="Login" component={user ? MyTabs : Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="forgetPass" component={ForgotPassword} />
        <Stack.Screen name="HomeTabs" component={MyTabs} />
        <Stack.Screen name="Products" component={Products} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Body;
