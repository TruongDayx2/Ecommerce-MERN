import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from "./styles";
import { getProducts } from "../../API/products";
import { useNavigation } from "@react-navigation/native";


const dataCateMen = require("../../assets/data/cateMen.json");


const ProductsMen = ({ myParam }) => {
  const navigation = useNavigation();

  const { cate, sex1 } = myParam
  const handleItem=(item)=>{
    navigation.navigate('Detail',item)

  }
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.container} key={index} onPress={()=>handleItem(item)}>

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
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.priceItem}>{item.price}$</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const renderCate = ({ item, index }) => {
    return (
      <View style={styles.cate} key={index}>
        <Text style={styles.titleCate}>{item}</Text>
      </View>
    )
  }

  const [data, setData] = useState(dataCateMen)
  const [cateData, setCateData] = useState([])

  useEffect(() => {
    let cateTemp = []
    for (i in data) {
      cateTemp.push(data[i]._id)
    }
    cateTemp.push('All')
    setCateData(cateTemp)
  }, [data])


  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts({ catePath: cate, cate: sex1 });
      if (res.status === 200) {
        setProducts(res.data);
      }
    };
    fetchData();
  }, []);
  console.log(products)
  return (

    <View>
      <FlatList
        style={styles.listCate}
        data={cateData}
        renderItem={renderCate}
        keyExtractor={(item) => item._id}
        numColumns={1}
        horizontal={true}
      />
      <View style={styles.filterPrice}>
        <View style={styles.filter}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../../assets/img/filter.png")}
          />
          <Text style={styles.filterTitle}>Filters</Text>
        </View>
        <View style={styles.filter}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../../assets/img/price.png")}
          />
          <Text style={styles.filterTitle}>Price:lowest to high</Text>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </View>
  )
}

export default ProductsMen