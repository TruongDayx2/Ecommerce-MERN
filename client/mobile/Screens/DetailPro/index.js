import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from "react-redux";
import { addCart } from "../../API/carts";

const DetailProduct = ({ route }) => {
  const payload = route.params;
  const item = payload.item
  const size = Object.keys(item.size_color)

  const user = useSelector((state)=>state.user.currentUser)
  
  const navigation = useNavigation();
  const [sizeSelect, setSizeSelect] = useState(size[0])
  const [col, setCol] = useState(item.size_color[sizeSelect])
  const [color, setColor] = useState(Object.keys(col))
  const [colorSelect, setColorSelect] = useState(color[0])
  const [quantity, setQuantity] = useState(col[color[0]])
  const [quantitySelect,setQuantitySelect]=useState(1)
  useEffect(() => {
    setCol(item.size_color[sizeSelect])
    setQuantitySelect(1)

  }, [sizeSelect])
  useEffect(() => {
    setColor(Object.keys(col))
    setQuantitySelect(1)

  }, [col])
  useEffect(() => {
    setColorSelect(color[0])
    setQuantitySelect(1)

  }, [color])
  useEffect(() => {
    setQuantity(col[colorSelect])
    setQuantitySelect(1)
  }, [colorSelect])

  // console.log('size',size)
  // console.log('sizeSelect',sizeSelect)
  // console.log('col',col)
  // console.log('color',color)
  // console.log('colorSelect',colorSelect)
  // console.log(quantity)
  // console.log(item._id,' ',quantitySelect,' ',sizeSelect,' ',colorSelect)
  const handleAmount=(e)=>{
    if(e==='plus'){
      let k = quantitySelect
      if (k<quantity){
        k++
      }
      setQuantitySelect(k)
    }else{
      let k = quantitySelect
      if (k>1){
        k--
      }
      setQuantitySelect(k)
    }
  }

  const handleAddCart =()=>{
    if (user){
      console.log('==================================')
      const id=user.data[0]._id
      const token=user.token
      const data = {
        "userId":id,
        "products":[
          {
          "productId":item._id,
          "quantity":quantitySelect,
          "size":sizeSelect,
          "color":colorSelect
          }
        ]
      }
      const res = addCart({token,data})
      alert('Successfull');
    }else{
      navigation.navigate('Login')
    }
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.topSide}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Image source={require('../../assets/img/back.png')} style={{ width: 30, height: 30, marginLeft: 5 }} resizeMode="stretch" />
          </TouchableOpacity>
          <Text style={styles.topSideTitle}>{item.title}</Text>
          <View></View>
        </View>
        <ScrollView>
          <View style={styles.areaImg}>
            <Image
              style={styles.img}
              source={{
                uri: item.img
                  ? item.img
                  : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.filter}>
            <View style={styles.filterMini}>
              <Text style={styles.filterText}>Size</Text>
              <SelectDropdown
                defaultButtonText={size[0]}
                data={size}
                buttonStyle={
                  {
                    'width': 100,
                    'backgroundColor': 'white',
                    'borderColor': 'red',
                    'borderWidth': 1,
                    'borderRadius': 10
                  }
                }
                onSelect={(selectedItem, index) => {

                  setSizeSelect(selectedItem)
                }}
              />
            </View>
            <View style={styles.filterMini}>
              <Text style={styles.filterText}>Color</Text>
              <SelectDropdown
                defaultButtonText={colorSelect}
                data={color}
                buttonStyle={
                  {
                    'width': 100,
                    'backgroundColor': 'white',
                    'borderColor': 'red',
                    'borderWidth': 1,
                    'borderRadius': 10
                  }
                }
                onSelect={(selectedItem, index) => {
                  setColorSelect(selectedItem)
                }}
              />
            </View>

          </View>
          <View style={styles.itemLeft}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.quantityText}>Quantity</Text>
              <View style={styles.amount}>
                <TouchableOpacity onPress={() => handleAmount(item, 'minus')}>
                  <View style={[styles.btn, styles.minus]}>
                    <Image
                      style={styles.imgBtn}
                      resizeMode="contain"
                      source={require("../../assets/img/minus.png")}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.quantity}>
                  <Text style={{fontSize:20}}>{quantitySelect}</Text>
                </View>
                <TouchableOpacity onPress={()=>handleAmount('plus')}>
                  <View style={[styles.btn, styles.plus]}>
                    <Image
                      style={styles.imgBtn}
                      resizeMode="contain"
                      source={require("../../assets/img/plus.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:30 }}>
              <Text style={styles.quantityText}>Price</Text>
              <Text>{quantitySelect * item.price}$</Text>
            </View>
          </View>
          <View style={styles.des}>
            <Text style={{fontSize:18}}>{item.desc}</Text>
          </View>
        </ScrollView>
        <View style={styles.botSide}>
          <TouchableOpacity style={styles.btnAdd} onPress={handleAddCart}>
                <Text style={styles.btnText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default DetailProduct;
