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
  filter:{
    // backgroundColor:'red',
    marginTop:10,
    width:width,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  filterMini:{
    flexDirection:'row',
    alignItems:'center',
  },
  filterText:{
    marginRight:20,
    fontSize:15,
    fontWeight:'bold'
  },
  itemLeft:{
    marginTop:15,
    width:'100%',
    marginLeft:25,
    alignItems:'center',
    flexDirection:'row',
    // justifyContent:'space-around'
    // backgroundColor:'red',
  },
  quantityText:{
    marginRight:10,
    fontWeight:'bold',
    fontSize:15
  },
  amount:{
    flexDirection:'row',
    alignItems:'center',
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
    marginHorizontal:10,
  },
  imgBtn:{
    width:'33%',
    height:'100%',
    backgroundColor: "transparent",
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  des:{
    marginTop:20,
    marginLeft:20
  },
  botSide:{
    backgroundColor:'#fff',
    height:80,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  btnAdd:{
    backgroundColor: "#289B94",
    padding: 15,
    borderRadius: 30,
    width:'95%',
    marginHorizontal:'2.5%',
    justifyContent:'center',
    flexDirection:'row'
  },
  btnText:{
    color: "white",
    fontSize:15,
}
});

export default styles;
