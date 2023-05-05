import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  list:{
    height:'85%'
  },
  container: {
    flex:1,
    backgroundColor: "#BFF0FF",
    height:width/1.7,
    width:width/4,
    marginTop:10,
    flexDirection:'column',
    marginHorizontal:'5%',
    borderRadius:10
  },
  info:{
    height:'30%',
    width:'100%',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:20
  },
  priceItem:{
    fontSize:15
  },
  rightSide:{
    width:'100%',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  img:{
    marginTop:10,
    width:'80%',
    height:'90%',
    // backgroundColor: "transparent",
    borderRadius:10,
    flex:1
  },
  cate:{
    backgroundColor:'black',
    height:30,
    // width:70,
    margin:10,
    paddingHorizontal:10,
    alignSelf: 'flex-start',
    // width:120,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  },
  titleCate:{
    color:'white',
    paddingHorizontal:10
    // padding:20
  },
  filterPrice:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    // marginHorizontal:10
    backgroundColor:'#fff',
    paddingVertical:5,
    // marginTop:5    
  },
  filter:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  icon:{
    height:30,
    width:30,
    marginRight:10
  }
  
  
});

export default styles;
