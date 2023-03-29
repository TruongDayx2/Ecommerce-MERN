import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        width:width/1.5,
        height:width/1.2,
        padding:10,
        borderRadius:10,
        marginTop:20,
        marginBottom:5,
        // marginLeft:10,
        alignItems:'center',
        elevation:8,
        backgroundColor:'#E3F6FC'
    },
    image: {
        width:width/2,
        height:width/1.3,
        backgroundColor:'transparent',
        position:'absolute',
        top:10,
        borderRadius:10
    },


    
})

export default styles