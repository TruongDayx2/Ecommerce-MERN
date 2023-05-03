import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox'
import CartProductItem from '../../Components/CartProductItem';
import styles from "./styles";

const cartData = require("../../assets/data/cart.json");
const Cart = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [data, setData] = useState(cartData.products)
  const [checkAll,setCheckAll] = useState(false)
  const toggleItem = (item) => {
    const id = item.productId + item.color + item.size
    if (isChecked(id)) {
      setCheckedItems(checkedItems.filter(filterItem => filterItem !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const isChecked = (id) => {
    return checkedItems.includes(id);
  };
  const handleTickAll =()=>{
    setCheckAll(!checkAll)
  }
  useEffect(() => {
    if (checkAll){
      let listTemp =[]
      for (i in data){
        let item=data[i]
        let id = item.productId + item.color + item.size
        listTemp.push(id)
      }
      setCheckedItems(listTemp)
    }else{
      setCheckedItems([])
    }
    
  }, [checkAll])
  

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item} key={index}>
        <Image
          style={styles.img}
          resizeMode="contain"
          source={{
            uri: item.img
              ? item.img
              : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
          }}
        />
        <View style={styles.itemLeft}>
          <Text style={styles.nameItem}>{item.namePro}</Text>
          <View style={styles.filter}>
            <Text style={styles.color}>Color: {item.color}</Text>
            <Text style={styles.size}>Size: {item.size}</Text>
          </View>
          <View style={styles.amount}>
            <TouchableOpacity>
              <View style={[styles.btn, styles.minus]}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={require("../../assets/img/minus.png")}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.quantity}>
              <Text>{item.quantity}</Text>
            </View>
            <TouchableOpacity>
              <View style={[styles.btn, styles.plus]}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={require("../../assets/img/plus.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemRight}>
          {/* <View style={styles.itemRight}> */}
            {/* <View > */}
              <Checkbox
                style={styles.touch}
                onValueChange={()=>toggleItem(item)}
                value={isChecked(item.productId + item.color + item.size) ? true : false}
              />
            {/* </View> */}
            <View style={styles.price}>
              <Text>{item.price * item.quantity} $</Text>

            </View>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.topSide}>
        <Text style={styles.title}>My Bag</Text>
        <View style={styles.topRightSide}>
          <Image
            style={styles.iconSearch}
            resizeMode="contain"
            source={require("../../assets/img/search.png")}
          />
          <TouchableOpacity onPress={()=>handleTickAll()} >
            <View style={styles.checkAll} >
              <Text style={styles.textAll}>All</Text>
              <Checkbox
                value={checkAll}
                onValueChange={()=>handleTickAll()}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.productId + item.color + item.size}
        numColumns={1}
      />

    </SafeAreaView>
  )
}

export default Cart