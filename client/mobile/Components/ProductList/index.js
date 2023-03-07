import { View, Text,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

import styles from './styles'
import ProductCard from '../ProductCard/index'



const ProductList = (props) => {

  const {item} = props

  return (
    <TouchableOpacity style={styles.touch}>
      <View style={styles.view}>
        <ProductCard {...item}/>
      </View>
    </TouchableOpacity>
  )
}

export default ProductList
