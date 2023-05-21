import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
import { Alert} from 'react-native'
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { otp, register } from "../../API/auth";
import { useDispatch } from "react-redux";
// import axios from 'axios';

import { ModalOtp } from "../../Components/ModalOtp"


const cateHomeData = require("../../assets/data/cateHome.json");
const dataSwipeSlide = require("../../assets/data/swipeSlide.json");

const SignUp = () => {
  const [firstName, setFirstName] = useState("")

  const [validFirstName, setValidFirstName] = useState(true)
  const [lastName, setLastName] = useState("")
  const [validLastName, setValidLastName] = useState(true)
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [password, setPassword] = useState("")
  const [validPass, setValidPass] = useState(true)
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(true)
  const [inputs, setInputs] = useState({
    password: "",
    cfPassword: "",
  });
  const [otpCheck, setOtpCheck] = useState("")
  const [isModal, setModal] = useState(false)
  const [optInput, setOtpInput] = useState("")
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const changeModalVisible = (bool) => {
    setModal(bool)
  }


  const fetchData = async () => {
    const res = await otp({ email: email });
    if (res.status === 200) {
      setOtpCheck(res.data.data[0].otp);
      // navigation.navigate('Otp',{})
      // changeModalVisible(true)
      setModal(true)
    } else {
      setOtpCheck("")
    }
    // console.log('res',res.data.data[0].otp)

  };
  const fetchRegister = async () => {
    if (optInput == otpCheck) {
      // console.log('1')
      const res = await register({ firstName, lastName, email, password })
      console.log(res)
      if (res.status === 200) {
        setModal(false)
        navigation.navigate('Login')
        alert('Successfull');
      }
    }

  };
  const handleSubmitOtp = (e) => {

    fetchRegister()
  }
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validatePass = (pass) => {
    if (pass) {
      return true
    }
    else return false
  };
  const validateFirstName = (first) => {
    if (first) {
      return true
    }
    else return false
  };
  const validateLastName = (last) => {
    if (last) {
      return true
    }
    else return false
  };
  const validatePasswordConfirm = (cfPassword) => {
    if (cfPassword !== password) {
      return false;
    } else return true
  };



  const handleRegister = (e) => {
    e.preventDefault()
    if (validateEmail(email)) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
    if (validatePass(password)) {
      setValidPass(true)
    } else {
      setValidPass(false)
    } if (validateFirstName(firstName)) {
      setValidFirstName(true)
    } else {
      setValidFirstName(false)
    }
    if (validateLastName(lastName)) {
      setValidLastName(true)
    } else {
      setValidLastName(false)
    }
    if (validatePasswordConfirm(passwordConfirm)) {
      setValidPasswordConfirm(true)
    } else {
      setValidPasswordConfirm(false)
    }
    fetchData();
    // if (otpCheck!==""){

    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.connext}>
            {/* TextSignUp */}
            <View>
              <Text style={styles.textSignUp}>Sign Up</Text>
            </View>
            {/* First Name*/}
            <View style={styles.viewFirstName}>
              <View style={styles.viewFirstName1}>
                <View>
                  <Text style={styles.textFirstName}>First name</Text>
                </View>
                <View style={styles.viewCenterFirstName}>
                  <View style={styles.textInputFirstName}>
                    <TextInput placeholder={"First name of user"} />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.inputError}>{validFirstName ? '' : 'Firstname is isvalid!'}</Text>
            {/* Last Name*/}
            <View style={styles.viewLastName}>
              <View style={styles.viewLastName1}>
                <View>
                  <Text style={styles.textLastName}>Last Name</Text>
                </View>
                <View style={styles.viewCenterLastName}>
                  <View style={styles.textInputLastName}>
                    <TextInput placeholder={"Last Name of user"} />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.inputError}>{validLastName ? '' : 'Lastname is isvalid!'}</Text>
            {/* Email*/}
            <View style={styles.viewEmail}>
              <View style={styles.viewEmail1}>
                <View>
                  <Text style={styles.textEmail}>Email</Text>
                </View>
                <View style={styles.viewCenterEmail}>
                  <View style={styles.textInputEmail}>
                    <TextInput placeholder={"Email of user"} />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.inputError}>{validEmail ? '' : 'Email is isvalid!'}</Text>
            {/* Password*/}
            <View style={styles.viewPassword}>
              <View style={styles.viewPassword1}>
                <View>
                  <Text style={styles.textPassword}>Password</Text>
                </View>
                <View style={styles.viewCenterPassword}>
                  <View style={styles.textInputPassword}>
                    <TextInput secureTextEntry={true} placeholder={"Password of user"} onChangeText={e => setPassword(e)} />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.inputError}>{validPass ? '' : 'Password is isvalid!'}</Text>
            {/* Confirm Password*/}
            <View style={styles.viewConfirmPassword}>
              <View style={styles.viewConfirmPassword1}>
                <View>
                  <Text style={styles.textConfirmPassword}>Confirm Password</Text>
                </View>
                <View style={styles.viewCenterConfirmPassword}>
                  <View style={styles.textInputConfirmPassword}>
                    <TextInput placeholder={"Confirm Password of user"} onChangeText={e => setPasswordConfirm(e)} />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.inputError}>{validPasswordConfirm ? '' : 'Confirm Password is isvalid!'}</Text>
            {/* Already have an account? */}
            <View style={styles.viewAccount}>
              <Text style={styles.textAccount}>Already have an account?</Text>
            </View>

            {/* Button */}
            <View style={styles.buttonSignUp}>
              <TouchableOpacity style={styles.btnSignUp}>
                <Text style={styles.titleStyle}>SIGNUP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}
export default SignUp;
