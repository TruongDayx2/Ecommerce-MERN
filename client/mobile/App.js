import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
// Screen
import Home from './Screens/Home';
import Products from './Screens/Products';
import Body from './Screens/index';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Home/>
    //   {/* <Body/> */}
    //   <StatusBar style="auto" />
    // </View>
    <Body/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
