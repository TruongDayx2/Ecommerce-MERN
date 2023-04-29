import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'

const ProfileComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.proLeft}>
                <Text style={styles.proLeftTop}>{props[0]}</Text>
                <Text style={styles.proLeftBot}>{props[1]}</Text>
            </View>
            <View style={styles.proRight}>
                <Image
                    source={require("../../assets/img/right-arrow.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="stretch"
                />
            </View>
        </View>
    )
}

export default ProfileComponent