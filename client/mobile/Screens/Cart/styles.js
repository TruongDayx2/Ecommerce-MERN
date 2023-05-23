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
  deleteView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  },
  btnDelete:{
    width:60,
    height:30,
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'white',
    justifyContent:'center',
    alignContent:'center'
  },
  textDelete:{
    color:'red',
    fontSize:15,
    marginLeft:5
  },
  checkAll:{
    // backgroundColor:'pink',
    flexDirection:'row',
    padding:10,
    width:'100%',
    // marginTop:40
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
  },
  botSide:{
    marginTop:20
  },
  priceArea:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    marginBottom:10
  },
  titlePrice:{
    fontSize:20
  },
  checkOut:{
    width:width
  },
  btnCheckOut:{
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
      fontSize:20,
  },
  viewLogin:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    height:height
  },
  loginText:{
    fontSize:20,
    marginBottom:20
  },
  btnLogin:{
    backgroundColor: "#289B94",
    padding: 15,
    borderRadius: 30,
    width:'80%',
    marginHorizontal:'10%',
    justifyContent:'center',
    flexDirection:'row'
  },
  otpModal:{
    height:'100%',
    width:'100%',
    // marginHorizontal:'10%',
    // marginVertical:'50%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  otpModalFill:{
    height:'70%',
    width:'80%',
    marginHorizontal:'10%',
    marginVertical:'15%',
    backgroundColor:'#fff',
    borderRadius:10
  },
  otpModalFillT:{
    height:'20%',
    width:'80%',
    marginHorizontal:'10%',
    marginVertical:'40%',
    backgroundColor:'#fff',
    borderRadius:10
  },
  otpInputView:{
    width:'100%',
    marginTop:20,
    justifyContent:"center",
    alignItems:'center'
  },
  otpInput:{
    marginTop:10,
    width:'80%',
    borderColor:'#e5e5e5',
    borderWidth:1,
    borderRadius:5,
    padding:15
  },
  btnGroup:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  btnCancel:{
    marginRight:5,
    padding: 10,
    backgroundColor: "#e1ecf4",
    borderRadius: 25,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSubmit:{
    marginLeft:5,
    padding: 10,
    backgroundColor: "#289B94",
    borderRadius: 25,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  }
  
});

export default styles;
