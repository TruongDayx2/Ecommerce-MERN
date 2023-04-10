import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import ProductList from "../../Components/ProductList/index";

const data = require("../../assets/data/products.json");

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
    return () => {
      setProducts([]);
    };
  }, []);

  // console.log(products[0].Size_Color.L, 'fdfdsdd')
  return (
    <View>
      <SafeAreaView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              marginTop: 50,
            }}
            //  onPress={() => getAll()}
          >
            <Text
              style={[
                {
                  paddingVertical: 3,
                  paddingHorizontal: 40,
                  marginStart: 20,
                  borderRadius: 29,
                  borderWidth: 2,
                  borderColor: "#000",
                  fontSize: 14,
                  backgroundColor: "#222222",
                },
                { color: "#fff", fontWeight: "700", fontSize: 20 },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {/* {categoryData.map((category, index) => (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                key={index}
                onPress={() => getStoryByCategory(category.name)}
              >
                <Text
                  style={[
                    {
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 25,
                      borderWidth: 2,
                      borderColor: "#D9D9D9",
                      fontSize: 14,
                    },
                    {
                      color: "#000",
                      fontWeight: "700",
                      fontSize: SPACING * 1.8,
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))} */}
        </ScrollView>
      </SafeAreaView>

      <View style={{ marginTop: 40, backgroundColor: "gainsboro" }}>
        <FlatList
          // horizontal
          data={products}
          renderItem={({ item }) => <ProductList key={item._id} item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default Products;
