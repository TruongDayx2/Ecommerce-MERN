import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';


const cartData = require("../../assets/data/cart.json");
const Cart = () => {

  console.log(cartData)
  return (
    <SafeAreaView>
      <Text>Cart</Text>
    </SafeAreaView>
  )
}

export default Cart