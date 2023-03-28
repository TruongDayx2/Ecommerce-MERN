import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    wrap:{
        width:width,
        height:width* 1.23
    },
    info:{
        flex:1,
        flexDirection:'column',
        marginLeft:10,
        top:'60%'
    },
    text:{
        color:'white',
        fontSize:40,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    btnShopNow:{
        backgroundColor: "#289B94",
        padding: 20,
        borderRadius: 10,
        width:140,
        
    },
    btnText:{
        color: "white",
        fontSize:20
    }

    
})

export default styles