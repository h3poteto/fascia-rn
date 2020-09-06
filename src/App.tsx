/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import {
  DynamicValue,
  useDynamicValue,
  DynamicStyleSheet,
} from 'react-native-dynamic';

import store from './store';
import {DrawerParam} from './navigations/drawer';
import Login from './components/Login';
import Home from './containers/home';

declare const global: {HermesInternal: null | {}};

const Drawer = createDrawerNavigator<DrawerParam>();

const App = () => {
  const styles = useDynamicValue(dynamicSytles);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
          </Drawer.Navigator>
        </NavigationContainer>
        <SafeAreaView style={styles.safearea} />
      </SafeAreaProvider>
    </Provider>
  );
};

const ConnectedApp = connectActionSheet(App);

const AppContainer = () => {
  return (
    <ActionSheetProvider>
      <ConnectedApp />
    </ActionSheetProvider>
  );
};

const dynamicSytles = new DynamicStyleSheet({
  safearea: {
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default AppContainer;
