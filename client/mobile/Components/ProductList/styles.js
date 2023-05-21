import { StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  touch: {
    width: width / 2,
  },
  view: {
    width: width,
    backgroundColor: "gainsboro",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
