import {Modal, Dimensions, TouchableNativeFeedback, StyleSheet, View, Text,SafeAreaProvider,TextInput,TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, { useEffect, useState } from "react";


import styles from "./styles";
export class BottomPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    show =()=>{
        this.setState({show: true})
    }

    close =()=>{
        this.setState({show: false})
    }
     
    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex:1, width:'100%'}}/>
        if(!onTouch) return view
        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    render() {
        let {show} = this.state 
        const {onTouchOutside} = this.props
        return (
                <Modal
                animationType={"fade"}
                transparent={true}
                visible={show}
                onRequestClose={this.close}>
                
            <View style={styles.container}>
                {this.renderOutsideTouchable(onTouchOutside)}
                <View style={styles.cont1}>
                <View>
                    <Text style={styles.textPSChange}>Password Change</Text>
                </View>
                {/* Old Password */}
                <View style={styles.viewPassword1}>
                    <View style={styles.password1}>
                    <View style={styles.viewCenterPassword}>
                        <View style={styles.ctPassword}>{/* icon */}</View>
                        <View style={styles.textInputPassword}>
                        <TextInput secureTextEntry={true} placeholder={"Password "} />
                        </View>
                    </View>
                    </View>
                </View>
                {/* ForgotPassword */}
                <View style={styles.forgotPassword}>
                    <Text style={styles.textForgotPassword}>Forgot your password?</Text>
                </View>
                {/* New Password */}
                <View style={styles.viewPassword1}>
                    <View style={styles.password1}>
                    <View style={styles.viewCenterPassword}>
                        <View style={styles.ctPassword}>{/* icon */}</View>
                        <View style={styles.textInputPassword}>
                        <TextInput secureTextEntry={true} placeholder={"New Password "} />
                        </View>
                    </View>
                    </View>
                </View>
                {/* Repeat New Password */}
                <View style={styles.viewPassword1}>
                    <View style={styles.password1}>
                    <View style={styles.viewCenterPassword}>
                        <View style={styles.ctPassword}>{/* icon */}</View>
                        <View style={styles.textInputPassword}>
                        <TextInput secureTextEntry={true} placeholder={"Repeat New Password "} />
                        </View>
                    </View>
                    </View>
                </View>
                {/* Button */}
            
                <View style={styles.buttonLogin}>
                    <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.titleStyle}>SAVE PASSWORD</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
                </Modal> 
            
            );
    };
};
  
//   const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         backgroundColor: "#000000AA",
//         justifyContent:"flex-end"
//     },
//     textStyle: {
//         color: 'black',
//         fontWeight: 'bold',
//         textAlign: 'center'
//     },
//     button: {
//         borderRadius: 20,
//         paddingTop: 20,
//         elevation: 2,
//       },
//     cont1: {
//         backgroundColor: "#F9F9F9",
//         width:'100%',
//         borderTopRightRadius:30,
//         borderTopLeftRadius:30,
//         paddingHorizontal:10,
//         maxHeight: deviceHeight * 2.5
//       },
//       textPSChange: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "black",
//         left:100,
//         paddingTop:10,
        
//       },
//       viewPassword1: {
//         backgroundColor: "white",
//         marginTop: 15,
//       },
//       password1: {
//         backgroundColor: "white",
//         margin: 5,
//       },
//       textPassword: {
//         color: "black",
//         fontSize: 13,
//       },
//       viewCenterPassword: {
//         flexDirection: "row",
//         borderBottomColor: "grey",
//       },
//       ctPassword: {
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 10,
//       },
//       textInputPassword: {
//         padding: 5,
//         flex: 1,
//       },
//       forgotPassword: {
//         marginTop: 20,
//         marginRight: 20,
//         alignItems: "flex-end",
//       },
//       textForgotPassword: {
//         color: "black",
//       },
//       buttonLogin: {
//         marginVertical: 30,
//       },
//       btnLogin: {
//         padding: 10,
//         backgroundColor: "#289B94",
//         borderRadius: 25,
//         width: "100%",   
//         justifyContent: "center",
//         alignItems: "center",
//       },
//       titleStyle: {
//         color: "white",
//         fontSize: 20,
//         fontWeight: "bold",
//       },
//   });
  
  export default BottomPopup; 