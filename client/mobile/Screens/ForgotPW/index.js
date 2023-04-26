import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
  import styles from "./styles";
  
  const ForgotPassword = () => {

    return (
      <SafeAreaProvider>
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
  