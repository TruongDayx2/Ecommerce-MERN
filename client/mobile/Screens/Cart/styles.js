import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#F5F5F5",
    height:'100%',
    width:width
  },
  topSide:{
    height:height/6,
    flexDirection:'row',
    alignItems:'flex-end'
  },
  title:{
    // backgroundColor:'red',
    fontSize:40,
    marginLeft:15,
    // alignItems:'center',
    width:'65%',
    // height:'100%'/
  },
  topRightSide:{
    width:'30%',
    height:'100%',
    flexDirection:'column',
    // backgroundColor:'grey',
    alignItems:'flex-end',
    justifyContent:'space-around',
    paddingRight:20
  },
  iconSearch:{
    height:30,
    width:30,
    marginTop:20
  },

  checkAll:{
    // backgroundColor:'pink',
    flexDirection:'row',
    padding:10,
    width:'100%',
    marginTop:40
  },
  textAll:{
    paddingRight:30
  },
  list:{
    padding:8,
    marginTop:20,
    width:width,
    height:'60%'
  },
  item:{
    height:width/3,
    backgroundColor:'white',
    marginBottom:10,
    borderRadius:10,
    marginHorizontal:'2%',
    flexDirection:'row',
    flex:1
  },
  itemLeft:{
    marginTop:15,
    marginLeft:10,
    width:'35%',
    // backgroundColor:'red',
  },
  nameItem:{
    fontWeight:'bold',
  },
  filter:{
    marginTop:5,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  amount:{
    flexDirection:'row',
    alignItems:'center'
  },
  btn:{
    width:40,
    height:40,
    borderRadius:40/2,
    borderWidth:2,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },
  minus:{
    borderColor:'red',

  },
  plus:{
    borderColor:'#289B94',

  },
  quantity:{
    marginHorizontal:10
  },
  itemRight:{
    // backgroundColor:'grey',
    flex:1,
    flexDirection:'column',
    alignItems:'flex-end',
    justifyContent:'space-around'
  },
  touch:{
    // alignItems:'flex-start'
    // flex:1,
    // alignItems:"center"
    marginRight:5
  },
  price:{
    // width:'100%',
    // height:'100%',
    // flex:1,
    // backgroundColor:'pink',
    marginRight:5
  },
  img:{
    width:'33%',
    height:'100%',
    backgroundColor: "transparent",
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  }
  
});

export default styles;
