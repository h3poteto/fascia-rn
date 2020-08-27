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

import store from './store';
import {DrawerParam} from './navigations/drawer';
import Login from './components/Login';
import Home from './components/Home';

declare const global: {HermesInternal: null | {}};

const Drawer = createDrawerNavigator<DrawerParam>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
