import { View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox'
import styles from "./styles";
import { deleteCart, getCart, updateCart, updateCartOrder } from '../../API/carts';
import { useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import { addOrder } from '../../API/order';

const delivery = ['GHN','GHTK','GH24h']

const Cart = () => {

  const user = useSelector((state) => state.user.currentUser)

  const [checkedItems, setCheckedItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [k, setK] = useState([])
  const [isModal, setModal] = useState(false)
  const [isModalInfo, setModalInfo] = useState(false)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState()
  const [ship, setShip] = useState(10)
  


  const fetchData = async () => {
    let token = user.token
    const idUser = user.data[0]._id
    const res = await getCart({ token, idUser });
    if (res.status === 200) {
      setK(res.data[0].products);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, []);

  const updateData = async () => {
    let token = user.token
    const idUser = user.data[0]._id

    const res = await updateCart({ token, idUser, k });
    if (res.status === 200) {
      console.log(' updateCart')
    }
  }
  useEffect(() => {
    updateData()
  }, [k])

  const toggleItem = (item) => {
    if (item.productId.inStock) {
      const id = item._id;
      if (isChecked(id)) {
        setCheckedItems(checkedItems.filter(filterItem => filterItem !== id));
      } else {
        setCheckedItems([...checkedItems, id]);
      }
    }
  };

  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const handleTickAll = () => {
    setCheckAll(!checkAll)
  }

  useEffect(() => {
    if (checkAll) {
      const listTemp = k.reduce((acc, item) => {
        if (item.productId.inStock) {
          const id = item._id;
          acc.push(id);
        }
        return acc;
      }, []);
      setCheckedItems(listTemp);
    } else {
      setCheckedItems([]);
    }
  }, [checkAll]);

  useEffect(() => {
    let total = 0;
    k.forEach((item) => {
      if (item.productId.inStock) {
        const id = item._id;
        if (checkedItems.includes(id)) {
          total += item.productId.price * item.quantity;
        }
      }
    });
    setTotalPrice(total);
  }, [checkedItems, k]);

  const handleAmount = (item, key) => {
    if (item.productId.inStock) {
      const idItem = item._id;
      const updateQuantity = k.map((item1) => {
        const id = item1._id;
        if (id === idItem) {
          let quantity = item1.quantity;
          if (key === 'minus' && quantity > 1) {
            quantity--;
          } else if (key === 'plus' && quantity < item1.productId.size_color[item.size][[item.color]]) {
            quantity++;
          } else if (key === 'plus' && quantity > item1.productId.size_color[item.size][[item.color]]) {
            quantity = item1.productId.size_color[item.size][[item.color]]
          }
          return {
            ...item1,
            quantity,
          };
        }
        return item1;
      });
      setK(updateQuantity);
    }
  }

  const handleCheckOut = async() => {
    if(checkedItems.length>0){
      console.log('checkedItems', checkedItems)
      let temp=[]
      const updateK = [...k]
      for (i in checkedItems){
        for(j in updateK){
          if (checkedItems[i] === updateK[j]._id){
            temp.push(updateK[j])
            updateK.splice(j, 1);
          }
        }
      }
      // console.log(temp)
      const temp2 = temp.map((obj)=>({
        ...obj,
        productId:obj.productId._id
      }))
      console.log(updateK)
      let token = user.token
      const idUser = user.data[0]._id

      const data = {
        "userId":idUser,
        "products":temp2,
        "amount":totalPrice + ship,
        "status":"pending",
        "address":address,
        "phone":phone
      }

      const res = await addOrder({token,idUser,data})
      if (res.status === 200){
        console.log('You have successfully ordered')
        setK(updateK)
        handleUpdateCartOrder()
        alert('You have successfully ordered');
      }
    }
  }
  const handleUpdateCartOrder= async()=>{
    let token = user.token
    const idUser = user.data[0]._id
    updateCartOrder
    const res = await updateCartOrder({ token, idUser, k });
    if (res.status === 200) {
      console.log(' updateCart')
    }
  }
 
  const handleFillInfo=()=>{
    if(checkedItems.length>0){
      setModalInfo(true)
    }
  }
  const handleDelete =()=>{
    if(checkedItems.length>0){
      setModal(true)
    }
  }
  const deleteData = async () => {
    let token = user.token
    const idUser = user.data[0]._id
    const res = await deleteCart({ token, idUser, checkedItems });
    if (res.status === 200) {
 
      alert('Successfull');
      setModal(false)
      fetchData()
    }else{
      alert('Error');
      setModal(false)
    }
  }
  const handleSubmitDelete =()=>{
    deleteData()
    
  }
  const handleSubmitCheckOut=()=>{
    if (address && phone && phone.toString().length === 10){
      console.log('xac nhan')
      handleCheckOut()
      setModalInfo(false)
    }
  }

  const renderItem = ({ item, index }) => {
    if (item.productId.inStock) {
      return (
        <View style={styles.item} key={index}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{
              uri: item.productId.img
                ? item.productId.img
                : "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_895/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading...pg?_i=AA",
            }}
          />
          <View style={styles.itemLeft}>
            <Text style={styles.nameItem}>{item.productId.title}</Text>
            <View style={styles.filter}>
              <Text style={styles.color}>Color: {item.color}</Text>
              <Text style={styles.size}>Size: {item.size}</Text>
            </View>
            <View style={styles.amount}>
              <TouchableOpacity onPress={() => handleAmount(item, 'minus')}>
                <View style={[styles.btn, styles.minus]}>
                  <Image
                    style={styles.img}
                    resizeMode="contain"
                    source={require("../../assets/img/minus.png")}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.quantity}>
                <Text>{item.quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => handleAmount(item, 'plus')}>
                <View style={[styles.btn, styles.plus]}>
                  <Image
                    style={styles.img}
                    resizeMode="contain"
                    source={require("../../assets/img/plus.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemRight}>
            <Checkbox
              style={styles.touch}
              onValueChange={() => toggleItem(item)}
              value={isChecked(item._id)}
            />
            <View style={styles.price}>
              <Text>{item.productId.price * item.quantity}$</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
  return (
    user ? (
      <SafeAreaView>
        <View style={styles.topSide}>
          <Text style={styles.title}>My Bag</Text>
          <View style={styles.topRightSide}>
            <Image
              style={styles.iconSearch}
              resizeMode="contain"
              source={require("../../assets/img/search.png")}
            />
            <View style={styles.deleteView}>
              <TouchableOpacity style={styles.btnDelete} onPress={handleDelete}>
                <Text style={styles.textDelete}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTickAll()} >
                <View style={styles.checkAll} >
                  <Text style={styles.textAll}>All</Text>
                  <Checkbox
                    value={checkAll}
                    onValueChange={() => handleTickAll()}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={k}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
        <View style={styles.botSide}>
          <View style={styles.priceArea}>
            <Text style={styles.titlePrice}>Total amount</Text>
            <Text style={styles.titlePrice}>{totalPrice}$</Text>
          </View>
          <View style={styles.checkOut}>
            <TouchableOpacity style={styles.btnCheckOut} onPress={handleFillInfo}>
              <Text style={styles.btnText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
        transparent={true}
        animationType="fade"
        visible={isModal}
        // onRequestClose={() => changeModalVisible(false)}
      >
        {/* <ModalOtp/> */}
        <View style={styles.otpModal}>
          <View style={styles.otpModalFillT}>
            <View style={styles.otpInputView}>
              <Text>Are you sure to delete the product</Text>
              
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btnCancel} onPress={e=>setModal(false)}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmitDelete}>
                <Text>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalInfo}
        // onRequestClose={() => changeModalVisible(false)}
      >
        {/* <ModalOtp/> */}
        <View style={styles.otpModal}>
          <View style={styles.otpModalFill}>
            <View style={styles.otpInputView}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>CheckOut</Text>
              <View style={{width:'100%',marginLeft:40,marginTop:20}}>
                <Text>Address</Text>
                <TextInput style={styles.otpInput} 
                  onChangeText={e=>setAddress(e)}
                />
              </View>
              <View style={{width:'100%',marginLeft:40,marginTop:20}}>
                <Text>Phone</Text>
                <TextInput style={styles.otpInput} 
                  onChangeText={e=>setPhone(e)}
                  maxLength={10}
                  keyboardType="numeric"
                />
              </View>
              <View style={{width:'100%',marginLeft:40,marginTop:20,flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginRight:20}}>Delivery method</Text>
                <SelectDropdown
                defaultButtonText={delivery[0]}
                data={delivery}
                buttonStyle={
                  {
                    'width': 100,
                    'backgroundColor': 'white',
                    'borderWidth': 1,
                    'borderRadius': 10,
                  }
                }
                onSelect={(selectedItem, index) => {
                  if(selectedItem ==='GHN'){
                    setShip(10)
                  }else if(selectedItem ==='GHTK'){
                    setShip(15)
                  }else{
                    setShip(13)
                  }
                }}
              />
              </View>
              <View style={{width:'100%',marginLeft:40,marginTop:20,flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginRight:20}}>Order:</Text>
                <Text>{totalPrice}</Text>
              </View>
              <View style={{width:'100%',marginLeft:40,marginTop:20,flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginRight:20}}>Ship:</Text>
                <Text>{ship}</Text>
              </View>
              <View style={{width:'100%',marginLeft:40,marginTop:20,flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginRight:20}}>Grand Total:</Text>
                <Text>{ship + totalPrice}</Text>
              </View>
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btnCancel} onPress={e=>setModalInfo(false)}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmitCheckOut}>
                <Text>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    ) :
      (
        <SafeAreaView>
          <View style={styles.viewText}>
            <Text style={styles.textCart}>Your cart is empty</Text>
          </View>
        </SafeAreaView>
      )
  )
}

export default Cart;
