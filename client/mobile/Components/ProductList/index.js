import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

import styles from "./styles";
import ProductCard from "../ProductCard/index";
import { useNavigation } from "@react-navigation/native";

const ProductList = (props) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('Detail',item)
    // console.log(item)
  };

  const result = Object.values(props);
  const listItems = result.map((item) => (
    <TouchableOpacity
      delayPressIn={10}
      // onPress={handlePress}
      key={item._id}
      style={styles.touch}
    >
      <TouchableOpacity onPress={()=>handlePress(item)}>
        <View style={styles.view}>
          <ProductCard
            // key={item.id}
            {...item}
          />
      </View>
      </TouchableOpacity>
    </TouchableOpacity>
  ));
  return <View>{listItems}</View>;
};

export default ProductList;
