import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    touch: {
        width:width ,
    },
    view: {
        width:width ,
        backgroundColor:'gainsboro',
    }

    
})

export default styles