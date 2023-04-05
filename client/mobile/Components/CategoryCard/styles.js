import { StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width - 30,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
    top: 5,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white",
  },
  image: {
    width: width,
    height: 100,
    left: 70,
    backgroundColor: "transparent",
    position: "absolute",
  },
  title: {
    marginTop: 40,
    marginRight: 250,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
