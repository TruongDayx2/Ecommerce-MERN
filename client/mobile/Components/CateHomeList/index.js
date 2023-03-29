import { View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

import styles from './styles'
import CateHomeCard from '../CateHomeCard/index'



const CateHomeList = (props) => {

  const result = Object.values(props);
  const listItems = result.map((item) =>
  (<TouchableOpacity delayPressIn={20} key={item.id} style={styles.touch}>
    <View style={styles.view}>
      <CateHomeCard
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

export default CateHomeList
