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
    paddingTop: 50,
    flex: 1,
  },
  textLogin: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  viewEmail1: {
    backgroundColor: "white",
    marginTop: 40,
  },
  email1: {
    margin: 5,
  },
  textEmail: {
    color: "black",
    fontSize: 13,
  },
  viewCenterEmail: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  ctEmail: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textInputEmail: {
    padding: 5,
    flex: 1,
  },
  viewPassword1: {
    backgroundColor: "white",
    marginTop: 40,
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
  forgotPassword: {
    marginTop: 20,
    marginRight: 20,
    alignItems: "flex-end",
  },
  textForgotPassword: {
    color: "black",
  },
  buttonLogin: {
    marginVertical: 20,
  },
  btnLogin: {
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
