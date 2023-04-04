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
        component={Products}
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
  return (
    // <Home/>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Body;
