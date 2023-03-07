import { View, Text, Image } from 'react-native'
import React from 'react'

import styles from './styles'

const ProductCard = (props) => {
  const { title, price, img } = props
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <View style={styles.card} />
      <Text style={styles.title}>
        {title.length > 15 ? title.substring(0, 12) + '...' : title}
      </Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  )
}

export default ProductCard