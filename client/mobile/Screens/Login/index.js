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
import { login } from "../../API/auth"
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
  const [email, setEmail] = useState("");
  const [validEmail,setValidEmail] = useState(true)
  const [password, setPassword] = useState("");
  const [validPass,setValidPass] = useState(true)

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateEmail(email)){
      setValidEmail(true)
    }else{
      setValidEmail(false)
    }
    if (validatePass(password)){
      setValidPass(true)
    }else{
      setValidPass(false)
    }
    if (validateEmail(email) && validatePass(password)){
      login(dispatch, { email, password });
    }
  }
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validatePass = (pass) => {
    if (pass){
      return true
    }
    else false
  };
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
              <Text style={styles.textEmail}>Email</Text>
              <View style={styles.viewCenterEmail}>
                <View style={styles.textInputEmail}>
                  <TextInput placeholder={"Email"} 
                    onChangeText={e => 
                      setEmail(e)
                    } 
                  />
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.inputError}>{validEmail?'':'Email is isvalid!'}</Text>
          {/* Passwords */}
          <View style={styles.viewPassword1}>
            <View style={styles.password1}>
              <View>
                <Text style={styles.textPassword}>Password</Text>
              </View>
              <View style={styles.viewCenterPassword}>
                <View style={styles.textInputPassword}>
                  <TextInput secureTextEntry={true} placeholder={"Password "} 
                    onChangeText={e => 
                      setPassword(e) 
                    } 
                  />
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.inputError}>{validPass?'':'Password is isvalid!'}</Text>
          {/* ForgotPassword */}
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('forgetPass')
              }}
            >
              <Text style={styles.textForgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          {/* Button */}
          <View style={styles.buttonLogin}>
            <TouchableOpacity style={styles.btnLogin} disabled={isFetching} onPress={handleLogin}>
              <Text style={styles.titleStyle}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Login;
