import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const DetailProduct = ({ route }) => {
  const payload = route.params;
  const item = payload.item
  console.log('first',item.img)
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.topSide}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Image source={require('../../assets/img/back.png')} style={{ width: 30, height: 30, marginLeft: 5 }} resizeMode="stretch" />
            </TouchableOpacity>
            <Text style={styles.topSideTitle}>{item.title}</Text>
            <View></View>
        </View>
        <ScrollView>
          <View style={styles.areaImg}>
            <Image 
                style={styles.img}
                source={{
                  uri: item.img
                    ? item.img
                    : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
                }} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.filter}>
            <View>
              <Text>Size</Text>
              
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default DetailProduct;
