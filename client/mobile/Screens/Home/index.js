import { View, Text, FlatList, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

import CateHomeList from "../../Components/CateHomeList/index";
import SwipeSlide from "../../Components/SwipeSlide/index";
import styles from "./styles";
import ProductList from "../../Components/ProductList/index";
import { getProducts } from "../../API/products";
import { useNavigation } from "@react-navigation/native";

const cateHomeData = require("../../assets/data/cateHome.json");
const dataSwipeSlide = require("../../assets/data/swipeSlide.json");

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cateHome, setCateHome] = useState(cateHomeData);
  const [swipeSlide, setSwipeSlide] = useState(dataSwipeSlide);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts({ catePath: undefined, cate: undefined });
      if (res.status === 200) {
        setProducts(res.data.slice(0, 8));
      }
    };
    fetchData();
  }, []);
  // console.log(products)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SwipeSlide {...swipeSlide} />
          <CateHomeList {...cateHome} />
          <ProductList {...products} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
