import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
// Screen
import {store,persistor} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'

import Body from './Screens/index';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Body/>
      </PersistGate>
    </Provider>
  );
}


