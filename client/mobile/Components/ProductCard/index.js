import { View, Text, Image, Button } from 'react-native'
import React from 'react'

import styles from './styles'

const ProductCard = (props) => {
  const { title, price, img, size_color } = props
  const k = Object.values(size_color) 
  let totalPro =0
  k.forEach(function(e){
    let t = Object.values(e)
    totalPro += t.reduce((total,current)=>{
      return total+current
    })
    // console.log(t)
  })
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <View style={styles.card} />
      <Text style={styles.title}>
        {title.length > 15 ? title.substring(0, 12) + '...' : title}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {totalPro > 0 ?(
        <View style={{marginBottom:60}}>
          <Button title={'Add'} color={'green'}/>
        </View>
      ): 
        <Text style={{marginTop:20}}>Currently Unvailable</Text>  
      }
    </View>
  )
}

export default ProductCard