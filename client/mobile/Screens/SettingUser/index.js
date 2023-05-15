import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Switch,
    TouchableWithoutFeedback
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
  

  import styles from "./styles";

  // import { useDispatch } from 'react-redux';
  import { getProducts } from "../../API/products";
  import { useNavigation } from "@react-navigation/native";
  import BottomPopup from "../BottomPopup";
  // import axios from 'axios';
  
  const cateHomeData = require("../../assets/data/cateHome.json");
  const dataSwipeSlide = require("../../assets/data/swipeSlide.json");
  
  const SettingUser = () => {
    // const [products, setProducts] = useState([])
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let popupRef = React.createRef()
    const onShowPopup = () =>{
      popupRef.show()
    }
    const onClosePopup = () => {
      popupRef.close()
    }
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Image source={require('../../assets/img/back.png')} style={{ width: 30, height: 30, marginLeft: 5 }} resizeMode="stretch" />
            </TouchableOpacity>
          </View>
          <View style={styles.cont1}>
            <View>
              <Text style={styles.textSetting}>Setting</Text>
            </View>
            <View style={styles.viewPI}>
            <Text style={styles.textPersonal}>Personal Information</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Image source={require('../../assets/img/add_image.png')} style={{ width: 60, height: 60, marginLeft: 10 }} resizeMode="stretch" />             
            </TouchableOpacity>
            <Text style={styles.textAvatar}>Avatar</Text>
            </View>
            {/* LastName */}
            <View style={styles.viewLastName}>
                
              <View style={styles.lastName}>
                <View>
                  <Text style={styles.textLastName}>Last name</Text>
                </View>
                <View style={styles.viewCenterLastName}>
                  <View style={styles.ctLastName}>{/* icon */}</View>
                  <View style={styles.textInputLastName}>
                    <TextInput placeholder={"LastName"} />
                  </View>
                </View>
              </View>
            </View>
            {/* First Name */}
            <View style={styles.viewFirstName}>
              <View style={styles.lastName}>
                <View>
                  <Text style={styles.textLastName}>First Name</Text>
                </View>
                <View style={styles.viewCenterLastName}>
                  <View style={styles.ctLastName}>{/* icon */}</View>
                  <View style={styles.textInputLastName}>
                    <TextInput placeholder={"First Name"} />
                  </View>
                </View>
              </View>
            </View>

            
            {/* Password */}
            <View style={styles.viewPass}>
            <Text style={styles.textPersonal}>Password</Text>
                <TouchableWithoutFeedback onPress={onShowPopup}>
                  <Text style={styles.textChange}>Change</Text>
                </TouchableWithoutFeedback>
                <BottomPopup
                  ref ={(target) => popupRef = target} 
                  onTouchOutside = {onClosePopup}
                />
            </View>

            <View style={styles.viewPassword1}>
              <View style={styles.password1}>
                <View>
                  <Text style={styles.textPassword}>Password</Text>
                </View>
                <View style={styles.viewCenterPassword}>
                  <View style={styles.ctPassword}>{/* icon */}</View>
                  <View style={styles.textInputPassword}>
                    <TextInput secureTextEntry={true} placeholder={"Password "} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.viewNotifications}>
                <Text style={styles.textPersonal}>Notifications</Text>
                    <View  style={styles.viewSale}>
                        <Text style={styles.textSales}>Sales</Text>
                        <View style={styles.viewSwitch}>
                        <Switch 
                        trackColor={{false: '#C0C0C0', true: '#C0C0C0'}}
                        thumbColor={isEnabled ? '#289B94' : '#FFFFFF'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}/>
                        </View>  
                    </View>
                    <View style={styles.viewSale}>
                        <Text style={styles.textSales}>New Arrivals</Text>
                        <View style={styles.viewSwitch}>
                        <Switch 
                        trackColor={{false: '#C0C0C0', true: '#C0C0C0'}}
                        thumbColor={isEnabled ? '#289B94' : '#FFFFFF'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}/>
                        </View>  
                    </View> 
                    <View style={styles.viewSale}>
                        <Text style={styles.textSales}>Delivery Status Changes</Text>
                        <View style={styles.viewSwitch}>
                        <Switch 
                        trackColor={{false: '#C0C0C0', true: '#C0C0C0'}}
                        thumbColor={isEnabled ? '#289B94' : '#FFFFFF'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}/>
                        </View>  
                    </View> 
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  };
  
  export default SettingUser;
  