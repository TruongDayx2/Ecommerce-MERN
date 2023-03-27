import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        width:width,
        height:width/1.5,
        marginTop:10,
        marginBottom:5,
        alignItems:'center',
    },
    imageBg: {
        flex: 1,
        width:width,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    text: {
        color:'white',
        fontSize:40,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
   

    
})

export default styles