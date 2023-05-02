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
    backgroundColor:'red',
    height:height/5,
    flexDirection:'row'
  },
  title:{
    fontSize:40,
    alignItems:'center',
    width:'70%'
  },
  topRightSide:{
    flexDirection:'column'
  },
  list:{
    padding:8,
    marginTop:20,
    width:width,
  },
  item:{
    height:width/3,
    backgroundColor:'white',
    marginBottom:10,
    borderRadius:10,
    marginHorizontal:'2%',
    flexDirection:'row'
  },
  itemLeft:{
    marginTop:15,
    marginLeft:10,
    width:'35%'
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
  img:{
    width:'33%',
    height:'100%',
    backgroundColor: "transparent",
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  }
  
});

export default styles;
