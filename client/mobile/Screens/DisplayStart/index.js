import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const DisplayStart = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.connext}>
        {/* Image*/}
        <View>
          <Image
            source={require("../DisplayStart/1.png")}
            style={styles.logo}
          />
        </View>
        {/* Name shop*/}
        <View style={styles.viewShop}>
          <Text style={styles.nameShop}> Welcome to 77SHOP</Text>
        </View>

        {/* Button Login */}
        <View style={styles.buttonLogin}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login')
            }}
            style={styles.btnLogin}
          >
            <Text style={styles.titleStyle}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        {/* Button SIGNUP */}
        <View style={styles.buttonSignup}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp')
            }}
            style={styles.btnLogin}
          >
            <Text style={styles.titleStyle}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
        {/* Button GUEST */}
        <View style={styles.buttonGuest}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeTabs')
            }}
            style={styles.btnLogin}
            >
            <Text style={styles.titleStyle}>GUEST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DisplayStart;
