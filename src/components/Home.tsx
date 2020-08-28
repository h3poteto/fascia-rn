import React, {useRef, useEffect} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';

import {DrawerParam} from '@/navigations/drawer';
import {HomeParam} from '@/navigations/home';
import Projects from '@/containers/projects';
import Lists from '@/containers/lists';
import Tasks from '@/containers/tasks';
import Actions, {updateSession} from '@/actions/session';

type Props = DrawerScreenProps<DrawerParam, 'Home'> & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const RootStack = createStackNavigator<HomeParam>();

const Home: React.FC<Props> = ({dispatch}) => {
  const inputRef = useRef();

  useEffect(() => {
    dispatch(updateSession());
  }, [inputRef]);

  return (
    <RootStack.Navigator
      initialRouteName="Projects"
      mode="modal"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Projects" component={Projects}></RootStack.Screen>
      <RootStack.Screen name="Lists" component={Lists}></RootStack.Screen>
      <RootStack.Screen name="Tasks" component={Tasks}></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default Home;
