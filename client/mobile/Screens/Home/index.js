import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import CateHomeList from '../../Components/CateHomeList/index'

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
  return (
    <View>
        <View style={{ marginTop: 50, backgroundColor:'gainsboro'}}>
                <FlatList 
                    // horizontal
                    data={cateHome}
                    renderItem={({ item }) => <CateHomeList key={item.id} item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
        </View>
    </View>
  )
}

export default Home