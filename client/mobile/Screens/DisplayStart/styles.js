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
    paddingTop: 88,
    flex: 1,
  },
  logo: {
    width: 350,
    height: 335,
  },
  viewShop: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nameShop: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#289B94",
    justifyContent: "center",
    alignItems: "center",
  },

  //   BUTTON LOGIN
  buttonLogin: {
    marginVertical: 20,
    marginTop: 70,
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
  //   BUTTON SIGNUP
  buttonSignup: {
    marginVertical: 20,
    marginTop: 5,
  },

  //   BUTTON LOGIN
  buttonGuest: {
    marginVertical: 20,
    marginTop: 5,
  },
});

export default styles;
