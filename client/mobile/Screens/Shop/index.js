import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation,useRoute } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator();



import styles from "./styles";
import ShopWomen from '../../Components/ShopWomen';
import ShopMen from '../../Components/ShopMen';
import Products from '../Products';
import Login from '../Login';

const Shop = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSide}>
        <View style={styles.titleSearch}>
          <Text></Text>
          <View style={styles.title}><Text style={styles.titleText}>Category</Text></View>
          <Image
            style={styles.iconSearch}
            resizeMode="contain"
            source={require("../../assets/img/search.png")}
          />
        </View>
        <View style={styles.btnSlogen}>
          <TouchableOpacity style={styles.btnViewAll} 
            onPress={() => {
              navigation.navigate('Products',{cate:undefined,sex:'women'})
            }}
          >
            <Text style={styles.slogen}>Fashion and so much more</Text>
            <Text style={styles.viewAll}>Views all items</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cateSide}>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen name="Women" component={ShopWomen} />
            <Tab.Screen name="Men" component={ShopMen} />
            {/* <Tab.Screen name="Product" component={Login} /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </View>

    </SafeAreaView>
  )
}

export default Shop