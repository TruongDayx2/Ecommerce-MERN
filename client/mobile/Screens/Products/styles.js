import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#F5F5F5",
    height:height,
    width:width
  },
  topSide:{
    height:height/12,
    flexDirection:'column',
    // alignItems:'flex-end'
    marginTop:15
  },
  titleSearch:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:15,
    marginBottom:10    
  },
  title:{
    alignContent:'center',
  },
  titleText:{
    fontSize:25
  },
  iconSearch:{
    height:30,
    width:30,
  },
  
  cateSide:{
    // backgroundColor:'red',
    height:'90%',
  }
  
  
});

export default styles;
