import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topSide:{ 
    marginTop: 60,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  topSideTitle:{
    marginRight:20, 
    fontSize:20
  },
  areaImg:{
    height:height/2,
    width:'100%'
  },
  img:{
    marginTop:10,
    width:'100%',
    height:'90%',
    // backgroundColor: "transparent",
    borderRadius:10,
    flex:1
  },
  
});

export default styles;
