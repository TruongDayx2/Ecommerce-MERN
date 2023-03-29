import { View, Text,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

import styles from './styles'
import ProductCardHome from '../ProductCardHome/index'



const ProductList = (props) => {

  const handlePress =()=>{

  }
  

  const result = Object.values(props);
  const listItems = result.map((item) =>
  (<TouchableOpacity delayPressIn={10}  onPress={handlePress}  key={item._id} style={styles.touch}>
    <View style={styles.view}>
      <ProductCardHome
        // key={item.id}
        {...item}
      />
    </View>
  </TouchableOpacity>)
  );
  return (
    <View>
      {listItems}
    </View>
  )
}

export default ProductList
