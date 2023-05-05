import { View, Text, FlatList, Image } from 'react-native'
import React, { useState } from 'react'

import styles from "./styles";

const dataCate = require("../../assets/data/cateMen.json");



const ShopMen = () => {

  const renderItem = ({ item, index }) => {
    return (
    <View style={styles.container} key={index}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.rightSide}>
      <Image
          style={styles.img}
          resizeMode="contain"
          source={{
            uri: item.img
              ? item.img
              : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
          }}
        />
      </View>
    </View>
    )
  }


  const [data, setData] = useState(dataCate)
  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={1}
    />
  )
}

export default ShopMen