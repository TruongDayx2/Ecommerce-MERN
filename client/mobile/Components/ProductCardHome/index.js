import { View, Text, Image, Button } from 'react-native'
import React from 'react'

import styles from './styles'

const ProductCardHome = (props) => {
  const { title, price, img, size_color } = props

  return (
    <View style={styles.container}>
      <Image style={styles.image} 
        resizeMode='contain'
        source={{uri:img?img : 'https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA'}}
      />
    </View>
  )
}

export default ProductCardHome