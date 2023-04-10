import { StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 25,
    height: 230,
    padding: 10,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 5,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "#E3F6FC",
  },
  image: {
    width: 140,
    height: 150,
    backgroundColor: "transparent",
    borderRadius: 20,
    position: "absolute",
    top: 10,
  },
  title: {
    marginTop: 160,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "orange",
    marginTop: 5,
  },
});

export default styles;
