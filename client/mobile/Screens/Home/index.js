import { View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import CateHomeList from '../../Components/CateHomeList/index'
import styles from './styles'

const data = require('../../assets/data/products.json')
const cateHomeData = require('../../assets/data/cateHome.json')


const Home = () => {
    const [products, setProducts] = useState([])
    const [cateHome,setCateHome] = useState([])

    useEffect(() => {
        setProducts(data)
        setCateHome(cateHomeData)
        return () => {
            setProducts([])
            setCateHome([])
        }
    }, [])
    console.log('cate',cateHome)
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>

            <CateHomeList {...cateHome}/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home