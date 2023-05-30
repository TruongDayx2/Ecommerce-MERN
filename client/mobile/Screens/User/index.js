import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation,useRoute } from '@react-navigation/native';

import styles from "./styles";
import ProfileComponent from "../../Components/ProfileComponent/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../../API/auth'
import { useDispatch, useSelector } from 'react-redux';

const userData = require("../../assets/data/user.json");
const User = () => {
  const navigation = useNavigation();
  const user1 = useSelector((state)=>state.user.currentUser)
  
  console.log('user1',user1.data[0].lastname)
  const [user, setUser] = useState(...userData);
  const myOrders = ['My Orders', 'Already have 12 orders']

  const setting = ['Settings', 'Notifications, password']
  const logOut = ['Log out', '']
  const dispatch = useDispatch();

  const handleLogout =(e)=>{
    AsyncStorage.removeItem("persist:root")
    logout(dispatch)
    navigation.navigate('DisplayStart')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleScreen}>
          <Text style={styles.textTitle}>My Profile</Text>
        </View>
        <View style={styles.avtName}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: user.img
                ? user.img
                : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
            }}
          />
          <View style={styles.info}>
            <View style={styles.fullName}>
              <Text style={styles.fullNameTxt}>{user1.data[0].name} </Text>
              <Text style={styles.fullNameTxt}>{user1.data[0].lastname}</Text>
            </View>
            <Text style={styles.emailInfo}>{user1.data[0].email}</Text>
          </View>
        </View>
        <View style={styles.profile}>
          <ScrollView>
            <TouchableOpacity delayPressIn={80}
              onPress={()=>{
                navigation.navigate('MyOrder')
              }}
            >
              <ProfileComponent {...myOrders} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...setting} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}
              onPress={handleLogout
                // () => {
                // navigation.navigate('DisplayStart')
                // }
              }
            >
              <ProfileComponent {...logOut} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default User