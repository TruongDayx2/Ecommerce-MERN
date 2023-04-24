import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

import CateHomeList from "../../Components/CateHomeList/index";
import SwipeSlide from "../../Components/SwipeSlide/index";
import styles from "./styles";
import ProductList from "../../Components/ProductList/index";
// import { useDispatch } from 'react-redux';
import { getProducts } from "../../API/products";
import { useNavigation } from "@react-navigation/native";
// import axios from 'axios';

const cateHomeData = require("../../assets/data/cateHome.json");
const dataSwipeSlide = require("../../assets/data/swipeSlide.json");

const Login = () => {
  // const [products, setProducts] = useState([])
  const navigation = useNavigation();

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
                  <TextInput placeholder={"Username or Email"} />
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
                  <TextInput secureTextEntry={true} placeholder={"Password "} />
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
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.titleStyle}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Login;
