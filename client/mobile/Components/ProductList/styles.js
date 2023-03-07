import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    touch: {
        width:'50%',
    },
    view: {
        width:width/2,
        backgroundColor:'gainsboro',
    }

    
})

export default styles