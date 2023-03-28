import { View, Text, FlatList, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import CateHomeList from '../../Components/CateHomeList/index'
import SwipeSlide from '../../Components/SwipeSlide/index'
import styles from './styles'

const dataPro = require('../../assets/data/products.json')
const cateHomeData = require('../../assets/data/cateHome.json')
const dataSwipeSlide = require('../../assets/data/swipeSlide.json')

const Home = () => {
    const [products, setProducts] = useState([])
    const [cateHome, setCateHome] = useState([])
    const [swipeSlide, setSwipeSlide] = useState([])

    useEffect(() => {
        setProducts(dataPro)
        setCateHome(cateHomeData)
        setSwipeSlide(dataSwipeSlide)
        return () => {
            setProducts([])
            setCateHome([])
            setSwipeSlide([])
        }
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} >
                <SwipeSlide {...swipeSlide}/>
                {/* <ScrollView
                    // onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    
                    style={styles.wrap}
                >

                    {
                        swipeSlide.map((e, index) => (
                            <Image
                                key={index}
                                resizeMode='stretch'
                                style={styles.wrap}
                                source={{ uri: e.img }}
                            />


                        )
                        )
                    }
                   
                </ScrollView> */}
                <CateHomeList {...cateHome} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home