import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    height:'88%',
    width:'100%'
  },
  titleScreen:{
    marginTop:20,
    marginLeft:10
  },
  textTitle:{
    fontSize:40
  },
  avtName:{
    flexDirection:'row',
    marginHorizontal:15
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    borderRadius: 60/2,
    top: 10,
  },
  info:{
    margin:15
  },
  fullName:{
    flexDirection:'row',
  },
  fullNameTxt:{
    color:'black',
    fontSize:20
  },
  emailInfo:{
    color:"#9B9B9B"
  },
  profile:{
    width:'100%',
    height:'100%',
    marginTop:10,
    marginBottom:10
  }
  
});

export default styles;
