import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {DynamicValue, useDynamicValue} from 'react-native-dynamic';

import {DrawerParam} from '../navigations/drawer';
import {RootStore} from '../reducers';
import Actions from '../actions/projects';
import Index from './projects/index';

type Props = DrawerScreenProps<DrawerParam, 'Projects'> &
  RootStore & {
    dispatch: ThunkDispatch<any, any, Actions>;
  };

const Stack = createStackNavigator<Props>();

const backgroundColor = new DynamicValue('#ffffff', '#000000');
const titleColor = new DynamicValue('#0a0a0a', '#f0f0f0');

const Projects: React.FC<Props> = ({dispatch, projects}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        options={{
          title: 'Projects',
          headerStyle: {backgroundColor: useDynamicValue(backgroundColor)},
          headerTintColor: useDynamicValue(titleColor),
        }}>
        {(props) => (
          <Index {...props} dispatch={dispatch} projects={projects} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Projects;
