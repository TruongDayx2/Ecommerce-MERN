import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  connext: {
    backgroundColor: "#F5F5F5",
    margin: 15,
  },
  textSignUp: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  viewFirstName: {
    backgroundColor: "white",
    marginTop: 10,
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
    marginTop: 5,
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
    marginTop: 5,
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
    marginTop: 5,
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
    marginTop: 5,
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
    marginTop: -10,
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
  otpModal: {
    height: '100%',
    width: '100%',
    // marginHorizontal:'10%',
    // marginVertical:'50%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  otpModalFill: {
    height: height / 4,
    width: '80%',
    marginHorizontal: '10%',
    marginVertical: '50%',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  otpInputView: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: 'center'
  },
  otpInput: {
    marginTop: 10,
    width: '80%',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15
  },
  btnGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnCancel: {
    marginRight: 5,
    padding: 10,
    backgroundColor: "#e1ecf4",
    borderRadius: 25,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSubmit: {
    marginLeft: 5,
    padding: 10,
    backgroundColor: "#289B94",
    borderRadius: 25,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputError: {
    padding: 10,
    fontSize: 15,
    color: 'red'
  }

});

export default styles;
