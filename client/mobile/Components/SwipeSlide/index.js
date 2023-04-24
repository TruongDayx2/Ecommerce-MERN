import { View, Text, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Button } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigation,useRoute } from '@react-navigation/native';
import styles from './styles'

const { width: screenWidth } = Dimensions.get("window")
const index = (props) => {

    const navigation = useNavigation();

    const [data, setData] = useState([])
    const [img, setImg] = useState(0)
    const stepCarousel = useRef(null)

    useEffect(() => {
        setData(Object.values(props))
    }, [props]);

    const handleScroll = (e) => {
        if (!e) {
            return
        }
        const { nativeEvent } = e
        if (nativeEvent && nativeEvent.contentOffset) {
            const currentOffset = nativeEvent.contentOffset.x
            let imgIndex = 0
            if (currentOffset > 0) {
                imgIndex = Math.floor((currentOffset + screenWidth / 2) / screenWidth)
            }
            setImg(imgIndex)
        }
    }

    // useEffect(() => {
    //     if (data.length > 0) {
    //         let index = 0
    //         setInterval(() => {
    //             if (stepCarousel !== null) {

    //                 stepCarousel.current.scrollTo({ x: index * screenWidth, y: 0, animated: true })
    //                 index += 1
    //                 if (index === data.length) {
    //                     index = 0
    //                 }
    //             }
    //         }, 5000)
    //     }
    // }, [data])

    const onPress = () => { };
    return (
        <ScrollView
            onScroll={handleScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            nestedScrollEnabled={true}
            style={styles.wrap}
            ref={stepCarousel}
        >
            {
                data.map((e, index) => (
                    <View
                        key={index}
                    >
                        <ImageBackground
                            key={index}
                            resizeMode='cover'
                            style={styles.wrap}
                            source={{ uri: e.img }}
                        >
                            <View style={styles.info}>
                                <Text style={styles.text}>FALL</Text>
                                <Text style={styles.text}>into {e.title}</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Shop')
                                }} style={styles.btnShopNow}>
                                    <Text style={styles.btnText}>Shop Now</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                ))
            }
        </ScrollView>
    )
}

export default index