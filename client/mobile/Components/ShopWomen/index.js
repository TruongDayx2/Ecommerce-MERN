import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const dataCate = require("../../assets/data/cateWomen.json");



const ShopWomen = ({navigateToHome}) => {
  const navigation = useNavigation();

  const Item = ({ item }) => {

    console.log(item)
    return (
    <TouchableOpacity onPress={() => {
      // navigation.navigate('Products',{cate:undefined,sex:'women'})'
      // console.log('item',item)
      navigateToHome({cate:item._id,sex:'women'})
    }}>
      <View style={styles.container} >
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
    </TouchableOpacity>
    )
  }


  const [data, setData] = useState(dataCate)
  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={({item,index})=><Item item={item} index={index}/>}
      keyExtractor={(item) => item._id}
      numColumns={1}
    />
  )
}

export default ShopWomen