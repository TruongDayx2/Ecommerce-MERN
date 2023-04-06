import { View, Text, Image, Button } from "react-native";
import React from "react";

import styles from "./styles";

const ProductCard = (props) => {
  const { title, price, img, size_color } = props;
  const k = Object.values(size_color);
  let totalPro = 0;
  k.forEach(function (e) {
    let t = Object.values(e);
    totalPro += t.reduce((total, current) => {
      return total + current;
    });
  });
  console.log(price);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: img
            ? img
            : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
        }}
      />
      <Text style={styles.title}>
        {title.length > 15 ? title.substring(0, 12) + "..." : title}
      </Text>
      <Text style={styles.price}>{price}VND</Text>
    </View>
  );
};

export default ProductCard;
