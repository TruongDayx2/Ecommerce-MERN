import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {login} from "../../API/auth"
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const handleLogin = (e)=>{
    e.preventDefault();
    login(dispatch, { email, password });
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Image source={require('../../assets/img/back.png')} style={{ width: 30, height: 30, marginLeft: 5 }} resizeMode="stretch" />
          </TouchableOpacity>
        </View>
        <View style={styles.cont1}>
          <View>
            <Text style={styles.textLogin}>Login</Text>
          </View>
          {/* Email */}
          <View style={styles.viewEmail1}>
            <View style={styles.email1}>
              <View>
                <Text style={styles.textEmail}>Email</Text>
              </View>
              <View style={styles.viewCenterEmail}>
                <View style={styles.ctEmail}>{/* icon */}</View>
                <View style={styles.textInputEmail}>
                  <TextInput placeholder={"Email"}  onChangeText={e=>setEmail(e)}/>
                </View>
              </View>
            </View>
          </View>
          {/* Password */}
          <View style={styles.viewPassword1}>
            <View style={styles.password1}>
              <View>
                <Text style={styles.textPassword}>Password</Text>
              </View>
              <View style={styles.viewCenterPassword}>
                <View style={styles.ctPassword}>{/* icon */}</View>
                <View style={styles.textInputPassword}>
                  <TextInput secureTextEntry={true} placeholder={"Password "} onChangeText={e=>setPassword(e)}/>
                </View>
              </View>
            </View>
          </View>
          {/* ForgotPassword */}
          <View style={styles.forgotPassword}>
            <Text style={styles.textForgotPassword}>Forgot your password?</Text>
          </View>
          {/* Button */}
          <View style={styles.buttonLogin}>
            <TouchableOpacity style={styles.btnLogin}disabled={isFetching} onPress={handleLogin}>
              <Text style={styles.titleStyle}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Login;
