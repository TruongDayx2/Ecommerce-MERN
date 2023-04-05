import { StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "white",
  },
  viewOver: {
    backgroundColor: "#289B94",
    width: 365,
    height: 100,
    left: 15,
    borderRadius: 10,
    marginTop: 100,
  },
  viewText1: {
    fontSize: 24,
    top: 10,
    paddingHorizontal: 38,
    paddingVertical: 5,
    color: "#fff",
  },
  viewText2: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    left: 90,
    fontSize: 16,
    position: "absolute",
    color: "#fff",
    fontWeight: 400,
  },
});

export default styles;
