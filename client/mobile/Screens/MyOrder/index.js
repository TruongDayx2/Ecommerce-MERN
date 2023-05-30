import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../API/auth"
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../API/order";


const MyOrder = () => {
  const [data,setData] = useState([])
  const user = useSelector((state)=>state.user.currentUser)

  const fetchData = async () => {
    let token = user.token
    const idUser = user.data[0]._id
    const res = await getOrders({ token, idUser });
    if (res.status === 200) {
      setData(res.data);
    }
  };

  console.log(data)
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, []);
  const renderItem = ({item,index})=>{
    console.log(item)
    return(
    <View key={index} style={{backgroundColor:'white',margin:20,borderRadius:5,padding:20,borderColor:'green',borderWidth:1,flexDirection:'row'}}>
      <View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>id: </Text>
          <Text>{item._id}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>Status: </Text>
          <Text>{item.status}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>Total: </Text>
          <Text>{item.amount}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>Time: </Text>
          <Text>{item.createdAt}</Text>
        </View>
      </View>
      <TouchableOpacity style={{marginLeft:40}}>
                <View style={[styles.btn, styles.minus]}>
                  <Text>Detail</Text>
                </View>
        </TouchableOpacity>
    </View> 
    )
    
  }
  return (
    <SafeAreaProvider>
      
        <View style={styles.container}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Your Orders</Text>
          <View>
          <FlatList
          // style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          // numColumns={1}
        />
          </View>
        </View>
     
    </SafeAreaProvider>
  )
};

export default MyOrder;
