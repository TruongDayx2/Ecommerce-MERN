import { View, FlatList,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

import styles from './styles'
import CateHomeCard from '../CateHomeCard/index'



const ProductList = (props) => {

  var result = Object.values(props);
  console.log('item',result)
  return (
    <FlatList 
      // horizontal
      data={result}
      renderItem={({ item }) => 
        
        (<TouchableOpacity style={styles.touch}>
          <View style={styles.view}>
            <CateHomeCard {...item}/>
          </View>
        </TouchableOpacity>)
      }
      
      keyExtractor={item => item.id}
      numColumns={1}
    />
    
  )
}

export default ProductList
