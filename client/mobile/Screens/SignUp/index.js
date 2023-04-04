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
// import axios from 'axios';

const cateHomeData = require("../../assets/data/cateHome.json");
const dataSwipeSlide = require("../../assets/data/swipeSlide.json");

const SignUp = () => {
  // const [products, setProducts] = useState([])

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
          {/* Password*/}
          <View style={styles.viewPassword}>
            <View style={styles.viewPassword1}>
              <View>
                <Text style={styles.textPassword}>Password</Text>
              </View>
              <View style={styles.viewCenterPassword}>
                <View style={styles.textInputPassword}>
                  <TextInput placeholder={"Password of user"} />
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
                  <TextInput placeholder={"Confirm Password of user"} />
                </View>
              </View>
            </View>
          </View>
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
};

export default SignUp;
