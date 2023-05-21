import { StyleSheet, Dimensions, StatusBar } from "react-native";

var { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#F5F5F5",
    height:height,
    width:width
  },
  topSide:{
    height:height/6,
    flexDirection:'column',
    // alignItems:'flex-end'
    marginTop:15
  },
  titleSearch:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:15,
    marginBottom:10    
  },
  title:{
    alignContent:'center',
  },
  titleText:{
    fontSize:25
  },
  iconSearch:{
    height:30,
    width:30,
  },
  btnSlogen:{
    width:width
  },
  btnViewAll:{
    backgroundColor: "#289B94",
    padding: 15,
    paddingVertical:20,
    borderRadius: 10,
    width:'90%',
    marginHorizontal:'5%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  slogen:{
      color: "white",
      fontSize:25,
  },
  viewAll:{
    color: "white",
    fontSize:15,
  },
  cateSide:{
    // backgroundColor:'red',
    marginTop:20,
    height:'75%',
  }
  
  
});

export default styles;
