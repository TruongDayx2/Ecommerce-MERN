import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from "./styles";
import ProfileComponent from "../../Components/ProfileComponent/index";

const userData = require("../../assets/data/user.json");
const User = () => {

  const [user, setUser] = useState(...userData);
  const myOrders = ['My Orders', 'Already have 12 orders']
  const address = ['Shipping addresses', user.address]
  const visa = ['Payment methods', 'Visa **34']
  const code = ['Promocodes', 'You have special promocodes']
  const review = ['My reviews', 'Reviews for 4 items']
  const setting = ['Settings', 'Notifications, password']
  const logOut = ['Log out', '']

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
              <Text style={styles.fullNameTxt}>{user.name} </Text>
              <Text style={styles.fullNameTxt}>{user.lastname}</Text>
            </View>
            <Text style={styles.emailInfo}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.profile}>
          <ScrollView>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...myOrders} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...address} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...visa} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...code} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...review} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...setting} />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={80}>
              <ProfileComponent {...logOut} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default User