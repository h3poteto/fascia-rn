import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {DynamicValue, useDynamicValue} from 'react-native-dynamic';

import {DrawerParam} from '@/navigations/drawer';
import {ProjectsParam} from '@/navigations/projects';
import {RootStore} from '@/reducers';
import Actions from '@/actions/projects';
import Index from './projects/index';
import Lists from './lists/index';
import Task from './tasks/show';

type Props = DrawerScreenProps<DrawerParam, 'Projects'> &
  RootStore & {
    dispatch: ThunkDispatch<any, any, Actions>;
  };

const Stack = createStackNavigator<ProjectsParam>();

const dynamicBackgroundColor = new DynamicValue('#ffffff', '#000000');
const dynamicTitleColor = new DynamicValue('#0a0a0a', '#f0f0f0');

const Projects: React.FC<Props> = ({dispatch, projects, lists}) => {
  const backgroundColor = useDynamicValue(dynamicBackgroundColor);
  const titleColor = useDynamicValue(dynamicTitleColor);
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen
        name="Index"
        options={{
          title: 'Projects',
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
        }}>
        {(props) => (
          <Index {...props} dispatch={dispatch} projects={projects} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Lists"
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
        })}>
        {(props) => <Lists {...props} dispatch={dispatch} lists={lists} />}
      </Stack.Screen>
      <Stack.Screen
        name="Task"
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
        })}>
        {(props) => <Task {...props} dispatch={dispatch} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Projects;
