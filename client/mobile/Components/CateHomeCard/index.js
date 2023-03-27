import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

import styles from './styles'

const CateHomeCard = (props) => {
  const { cate, img, title } = props
  console.log('card',props)
  return (
    <View style={styles.container}>
      {<ImageBackground style={styles.imageBg} 
        resizeMode='cover'
         source={{uri:img?img : 'https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA'}}
      >
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
      }
    </View>
  )
}

export default CateHomeCard