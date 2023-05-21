import { StyleSheet, Dimensions } from "react-native";

var { width,height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex:1,

  },
  modal:{
    height:height,
    paddingTop:10,
    backgroundColor:"#fff",
    borderRadius:10
  }
});

export default styles;
