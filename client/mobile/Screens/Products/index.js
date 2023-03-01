import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'

import ProductList from '../../Components/ProductList/index'

const data = require('../../assets/data/products.json')


const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(data)
        return () => {
            setProducts([])
        }
    }, [])

    // console.log(products[0].Size_Color.L, 'fdfdsdd')
    return (
        <View>
            <Text> Product Container</Text>
            <View style={{ marginTop: 100 }}>
                <FlatList
                    horizontal
                    data={products}
                    renderItem={({ item }) => <ProductList key={item._id} item={item} />}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    )
}


export default Products