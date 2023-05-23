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
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [otpCheck, setOtpCheck] = useState("")
  const [isModal, setModal] = useState(false)
  const [optInput,setOtpInput]=useState("")
  const dispatch = useDispatch();

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
    if (optInput==otpCheck){
      // console.log('1')
      const res =await register({firstName,lastName,email,password})
      console.log(res)
      if(res.status===200){
        setModal(false)
        navigation.navigate('Login')
        alert('Successfull');
      }
    }

  };
  const handleSubmitOtp = (e)=>{

    fetchRegister()
  }
  const handleRegister = (e) => {
    e.preventDefault()
    fetchData();
    // if (otpCheck!==""){

    // }
  }
  return (
    <SafeAreaProvider>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image source={require('../../assets/img/back.png')} style={{ width: 30, height: 30, marginLeft: 5 }} resizeMode="stretch" />
        </TouchableOpacity>
      </View>
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
                  <TextInput placeholder={"First name of user"} onChangeText={e => setFirstName(e)} />
                </View>
              </View>
            </View>
          </View>
          {/* Last Name*/}
          <View style={styles.viewLastName}>
            <View style={styles.viewLastName1}>
              <View>
                <Text style={styles.textLastName}>Last Name</Text>
              </View>
              <View style={styles.viewCenterLastName}>
                <View style={styles.textInputLastName}>
                  <TextInput placeholder={"Last Name of user"} onChangeText={e => setLastName(e)} />
                </View>
              </View>
            </View>
          </View>
          {/* Email*/}
          <View style={styles.viewEmail}>
            <View style={styles.viewEmail1}>
              <View>
                <Text style={styles.textEmail}>Email</Text>
              </View>
              <View style={styles.viewCenterEmail}>
                <View style={styles.textInputEmail}>
                  <TextInput placeholder={"Email of user"} onChangeText={e => setEmail(e)} />
                </View>
              </View>
            </View>
          </View>
          {/* Password*/}
          <View style={styles.viewPassword}>
            <View style={styles.viewPassword1}>
              <View>
                <Text style={styles.textPassword}>Password</Text>
              </View>
              <View style={styles.viewCenterPassword}>
                <View style={styles.textInputPassword}>
                  <TextInput placeholder={"Password of user"} onChangeText={e => setPassword(e)} />
                </View>
              </View>
            </View>
          </View>
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
          {/* Already have an account? */}
          <View style={styles.viewAccount}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <Text style={styles.textAccount}>Already have an account?</Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <View style={styles.buttonSignUp}>
            <TouchableOpacity style={styles.btnSignUp} onPress={handleRegister}>
              <Text style={styles.titleStyle}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModal}
        // onRequestClose={() => changeModalVisible(false)}
      >
        {/* <ModalOtp/> */}
        <View style={styles.otpModal}>
          <View style={styles.otpModalFill}>
            <View style={styles.otpInputView}>
              <Text>Please Enter OTP from your email</Text>
              <TextInput style={styles.otpInput} 
                onChangeText={e=>setOtpInput(e)}
                maxLength={6}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btnCancel} onPress={e=>setModal(false)}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmitOtp}>
                <Text>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

export default SignUp;