import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {DrawerParam} from '@/navigations/drawer';
import {HomeParam} from '@/navigations/home';
import Projects from '@/containers/projects';
import Modals from '@/components/Modals';

type Props = DrawerScreenProps<DrawerParam, 'Home'>;

const RootStack = createStackNavigator<HomeParam>();

const Home: React.FC<Props> = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Projects"
      mode="modal"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Projects" component={Projects}></RootStack.Screen>
      <RootStack.Screen name="Modals" component={Modals}></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default Home;
