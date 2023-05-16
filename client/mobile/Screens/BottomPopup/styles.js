import { StyleSheet, Dimensions, StatusBar } from "react-native";
const deviceHeight =Dimensions.get("window").height;
var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000AA",
      justifyContent:"flex-end"
  },
  textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
  },
  button: {
      borderRadius: 20,
      paddingTop: 20,
      elevation: 2,
    },
  cont1: {
      backgroundColor: "#F9F9F9",
      width:'100%',
      borderTopRightRadius:30,
      borderTopLeftRadius:30,
      paddingHorizontal:10,
      maxHeight: deviceHeight * 2.5
    },
    textPSChange: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      left:100,
      paddingTop:10,
      
    },
    viewPassword1: {
      backgroundColor: "white",
      marginTop: 15,
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
      marginVertical: 30,
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