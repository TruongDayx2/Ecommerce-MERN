import { StyleSheet, Dimensions, StatusBar } from 'react-native'

var {width} = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
    scrollView: {
        backgroundColor: 'gainsboro',
    },
    

    
})

export default styles