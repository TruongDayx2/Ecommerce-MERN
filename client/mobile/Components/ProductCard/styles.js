import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        width:width/2-20,
        height:width/1.5,
        padding:10,
        borderRadius:10,
        marginTop:25,
        marginBottom:5,
        marginLeft:10,
        alignItems:'center',
        elevation:8,
        backgroundColor:'white'
    },
    image: {
        width:width/2 - 20 - 10,
        height:width/2 - 20 -30,
        backgroundColor:'transparent',
        position:'absolute',
        top:10
    },
    card:{
        marginBottom:70,
        height:width/2 -20-90,
        backgroundColor:'transparent',
        width:width/2 - 20 -10
    },
    title:{
        fontWeight:'bold',
        fontSize:14,
        textAlign:'center'
    },
    price:{
        fontSize:20,
        color:'orange',
        marginTop:5
    }

    
})

export default styles