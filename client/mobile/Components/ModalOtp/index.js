import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from "./styles";
const ModalOtp = () => {
  return (
    <TouchableOpacity 
      disabled={true}
      style={styles.container}
    >
      <View style={styles.modal}>
        <Text>ModalOtp</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ModalOtp