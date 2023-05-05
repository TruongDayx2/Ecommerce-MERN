import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
    height:width/4,
    width:'90%',
    marginTop:10,
    flexDirection:'row',
    marginHorizontal:'5%',
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
  },
  leftSide:{
    width:'50%',
    // backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
  },
  title:{
    fontSize:20
  },
  rightSide:{
    width:'50%',
    flex:1
  },
  img:{
    width:undefined,
    height:undefined,
    // backgroundColor: "transparent",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    flex:1
  },
  
  
});

export default styles;
