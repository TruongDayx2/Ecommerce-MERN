import React, { useEffect, useState } from "react";
import {View, Text,FlatList, StyleSheet,ScrollView,TouchableOpacity,Image
} from "react-native";
import styles from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductList from "../../Components/ProductList/index";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation,useRoute } from '@react-navigation/native';

import ShopMen from '../../Components/ShopMen';
import ProductsWomen from "../../Components/ProductsWomen";


const Tab = createMaterialTopTabNavigator()

const Products = ({ route }) => {

  const navigation = useNavigation();

  const { cate, sex } = route.params;
  const [cateName,setCateName] = useState(cate)
  console.log('cate', sex)
  useEffect(() => {
    if (cate === undefined){
      setCateName('All')
    }
  }, [cate])
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSide}>
        <View style={styles.titleSearch}>
          <TouchableOpacity onPress={() => {
              navigation.navigate('HomeTabs')
            }}>
            <Image
              style={styles.iconSearch}
              resizeMode="contain"
              source={require("../../assets/img/back.png")}
            />
          </TouchableOpacity>
          <View style={styles.title}><Text style={styles.titleText}>{cateName}</Text></View>
          <Image
            style={styles.iconSearch}
            resizeMode="contain"
            source={require("../../assets/img/search.png")}
          />
        </View>
      </View>
      <View style={styles.cateSide}>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen name="Women" component={()=> <ProductsWomen myParam={{cate,sex}}/>} />
            <Tab.Screen name="Men" component={ShopMen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

export default Products;
