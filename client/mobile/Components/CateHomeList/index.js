import { View, Text,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

import styles from './styles'
import CateHomeCard from '../CateHomeCard/index'



const ProductList = (props) => {

  const {item} = props

  return (
    <TouchableOpacity style={styles.touch}>
      <View style={styles.view}>
        <CateHomeCard {...item}/>
      </View>
    </TouchableOpacity>
  )
}

export default ProductList
