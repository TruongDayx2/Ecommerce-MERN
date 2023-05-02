import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox'
import CartProductItem from '../../Components/CartProductItem';
import styles from "./styles";

const cartData = require("../../assets/data/cart.json");
const Cart = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [data,setData] = useState(cartData.products)
  const toggleItem = (item) => {
    if (isChecked(item.productId)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
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
        <TouchableOpacity onPress={() => toggleItem(item)}>
          <View style={styles.itemRight}>
              <Checkbox
                status={isChecked(item.id) ? "checked" : "unchecked"} 
              />
          </View>
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
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(index) => index}
        numColumns={1}
      />

    </SafeAreaView>
  )
}

export default Cart