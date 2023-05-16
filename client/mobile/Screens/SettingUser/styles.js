import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  cont1: {
    backgroundColor: "#F5F5F5",
    margin: 10,
    paddingTop:10,
    flex: 1,
  },
  viewPI:{
    top:40,
  },
  textAvatar:{
    left:80,
    top: -40,
    color:"#C0C0C0",
  },
  textPersonal:{
    fontSize:17,
    fontStyle:"normal",
    fontWeight:"bold",
  },

  textSetting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  viewLastName: {
    backgroundColor: "white",
    marginTop: 30,
  },
  lastName: {
    margin: 5,
  },
  textLastName: {
    color: "black",
    fontSize: 13,
  },
  viewCenterLastName: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  ctLastName: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textInputLastName: {
    padding: 5,
    flex: 1,
  },
  viewFirstName:{
    backgroundColor: "white",
    marginTop: 10,
  },
  viewPass:{
    top: 15,
  },
  viewPassword1: {
    backgroundColor: "white",
    marginTop: 10,
  },
  password1: {
    backgroundColor: "white",
    margin: 5,
  },
  textPassword: {
    color: "black",
    fontSize: 13,
  },
  viewCenterPassword: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  ctPassword: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textInputPassword: {
    padding: 5,
    flex: 1,
  },
  btnChange: {
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    left:300,
    top: -25,
  },
  titleStyle: {
    color: "#C0C0C0",
    fontSize: 14,
    fontWeight: "normal",
  },
  viewNotifications:{
    marginLeft:15,
    top:30,
  },
  textNotifications:{
    fontSize:17,
    fontWeight: "bold",

  },
  viewSwitch:{
   top:-32,
  },
  viewSale:{
    top:25,
    marginTop:-20,
  },
  textSales:{
    fontSize:15,
    fontWeight:"normal",
    color:"black",
  },
  textChange:{
    paddingLeft:10,
    left:300,
    top: -20,
  }

});

export default styles;
