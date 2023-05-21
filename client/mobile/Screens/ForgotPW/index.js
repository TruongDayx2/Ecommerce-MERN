import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
  import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
  
  const ForgotPassword = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaProvider>
        <View style={{marginTop:40}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Image source={require('../../assets/img/back.png')} style={{ width: 30, height: 30, marginLeft:5 }} resizeMode="stretch"/>
          </TouchableOpacity>
      </View>
        <View style={styles.container}>
          <View style={styles.stepContainer}>
            {/* ForgotPassword */}
            <View>
              <Text style={styles.textForgotPassword}>Forgot Password</Text>
            </View>
            {/*View text */}
            <View style={styles.viewText}>
                  <Text>Please, enter your email address. You will receive a link to create
            a new password via email.</Text>
            </View>
            {/* Email */}
            <View style={styles.viewEmail}>
              <View style={styles.email}>
                <View>
                  <Text style={styles.textEmail}>Email</Text>
                </View>
                <View style={styles.viewCenterEmail}>
                  <View style={styles.icEmail}>{/* icon */}</View>
                  <View style={styles.textInputEmail}>
                    <TextInput placeholder={"Username or Email"} />
                  </View>
                </View>
              </View>
            </View>
            {/* SEND */}
            <View style={styles.buttonSend}>
            <TouchableOpacity style={styles.btnSend}>
              <Text style={styles.titleStyle}>SEND</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  };
  
  export default ForgotPassword;
  