import { StyleSheet, Dimensions} from "react-native";

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  stepContainer: {
    backgroundColor: "#F5F5F5",
    margin: 20,
    paddingTop: 100,
    flex: 1,
  },
  textLogin: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  textForgotPassword: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  viewText: {
    marginTop: 50,
  },
  viewEmail:{
    backgroundColor: "white",
    marginTop: 20,
  },
  email:{
    margin: 5,
    marginLeft:10,
  },
  textEmail:{
    color: "black",
    fontSize: 13,
  },
  viewCenterEmail:{
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  icEmail:{
    justifyContent: "center",
    alignItems: "center",
    
  },
  textInputEmail:{
    padding: 5,
    flex: 1,
  },
  buttonSend: {
    marginVertical: 20,
    marginTop: 30,
  },
  btnSend: {
    padding: 10,
    backgroundColor: "#289B94",
    borderRadius: 25,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  

});

export default styles;
