import { StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: '95%' ,
    height: 80,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal:'2.5%',
    marginBottom: 5,
    alignItems: "center",
    elevation: 4,
    backgroundColor: "#fff",
    flexDirection:'row'
  },
  proLeft:{
    marginLeft:10,
    width:'85%'
  },
  proLeftTop:{
    fontSize:20,
    marginBottom:5
  },
  proLeftBot:{
    color:"#9B9B9B"
  },

  
});

export default styles;
