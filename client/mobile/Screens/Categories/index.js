import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import CategoryList from "../../Components/CategoryList/index";
import styles from "./styles";
const data = require("../../assets/data/category.json");

const Categories = () => {
  const [category, setCategories] = useState([]);
  console.log("category", category);
  useEffect(() => {
    setCategories(data);
    return () => {
      setCategories([]);
    };
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.viewOver}>
          <Text style={styles.viewText1}>Fashion and so much more</Text>
          <TouchableOpacity style={{}}>
            <Text style={styles.viewText2}>Views All Items</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 50, backgroundColor: "gainsboro" }}>
        <FlatList
          // horizontal
          data={category}
          renderItem={({ item }) => <CategoryList key={item._id} item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
      </View>
    </View>
  );
};

export default Categories;
