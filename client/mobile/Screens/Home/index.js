import { View, Text, FlatList, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import CateHomeList from '../../Components/CateHomeList/index'
import SwipeSlide from '../../Components/SwipeSlide/index'
import styles from './styles'
import ProductList from '../../Components/ProductList/index'

const dataPro = require('../../assets/data/products.json')
const cateHomeData = require('../../assets/data/cateHome.json')
const dataSwipeSlide = require('../../assets/data/swipeSlide.json')

const Home = () => {
    const [products, setProducts] = useState(dataPro)
    const [cateHome, setCateHome] = useState(cateHomeData)
    const [swipeSlide, setSwipeSlide] = useState(dataSwipeSlide)
    useEffect(() => {
        setProducts(dataPro)
        return () => {
            setProducts([])
        }
    }, [dataPro])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} >
                <SwipeSlide {...swipeSlide} />
                <CateHomeList {...cateHome} />
                <ProductList {...products} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home