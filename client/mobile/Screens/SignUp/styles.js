import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  connext: {
    backgroundColor: "#F5F5F5",
    margin: 20,
    paddingTop: 80,
  },
  textSignUp: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  viewFirstName: {
    backgroundColor: "white",
    marginTop: 30,
  },
  viewFirstName1: {
    margin: 5,
  },
  textFirstName: {
    color: "black",
    marginLeft: 15,
    fontSize: 15,
  },
  viewCenterFirstName: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  textInputFirstName: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
  },
  //   last_name
  viewLastName: {
    backgroundColor: "white",
    marginTop: 30,
  },
  viewLastName1: {
    margin: 5,
  },
  textLastName: {
    color: "black",
    marginLeft: 15,
    fontSize: 15,
  },
  viewCenterLastName: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  textInputLastName: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
  },
  //   email
  viewEmail: {
    backgroundColor: "white",
    marginTop: 30,
  },
  viewEmail1: {
    margin: 5,
  },
  textEmail: {
    color: "black",
    marginLeft: 15,
    fontSize: 15,
  },
  viewCenterEmail: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  textInputEmail: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
  },
  //   Password
  viewPassword: {
    backgroundColor: "white",
    marginTop: 30,
  },
  viewPassword1: {
    margin: 5,
  },
  textPassword: {
    color: "black",
    marginLeft: 15,
    fontSize: 15,
  },
  viewCenterPassword: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  textInputPassword: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
  },
  //   ConfirmPassword
  viewConfirmPassword: {
    backgroundColor: "white",
    marginTop: 30,
  },
  viewConfirmPassword1: {
    margin: 5,
  },
  textConfirmPassword: {
    color: "black",
    marginLeft: 15,
    fontSize: 15,
  },
  viewCenterConfirmPassword: {
    flexDirection: "row",
    borderBottomColor: "grey",
  },
  textInputConfirmPassword: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
  },
  //   account alredy
  viewAccount: {
    marginTop: 20,
    marginRight: 20,
    alignItems: "flex-end",
  },
  textAccount: {
    color: "black",
  },
  //   BUTTON
  buttonSignUp: {
    marginVertical: 20,
  },
  btnSignUp: {
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
