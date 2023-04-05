import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

import styles from "./styles";
import CategoryCard from "../CategoryCard/index";

const CategoryList = (props) => {
  const handlePress = () => {};

  const result = Object.values(props);
  const listItems = result.map((item) => (
    <TouchableOpacity
      delayPressIn={10}
      onPress={handlePress}
      key={item._id}
      style={styles.touch}
    >
      <View style={styles.view}>
        <CategoryCard
          // key={item.id}
          {...item}
        />
      </View>
    </TouchableOpacity>
  ));
  return <View>{listItems}</View>;
};

export default CategoryList;
