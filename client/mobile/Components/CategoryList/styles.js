import { StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  touch: {
    width: width / 2,
  },
  view: {
    width: width / 2,
    backgroundColor: "gainsboro",
    flex: 1,
    marginStart: 15,
    marginEnd: 15,
  },
});

export default styles;
