import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {DynamicValue, useDynamicValue} from 'react-native-dynamic';

import {HomeParam} from '@/navigations/home';
import {ProjectsParam} from '@/navigations/projects';
import {State as ProjectsState} from '@/reducers/projects';
import Actions from '@/actions/projects';
import Index from './projects/index';

type Props = StackScreenProps<HomeParam, 'Projects'> & {
  state: ProjectsState;
} & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const Stack = createStackNavigator<ProjectsParam>();

const dynamicBackgroundColor = new DynamicValue('#ffffff', '#000000');
const dynamicTitleColor = new DynamicValue('#0a0a0a', '#f0f0f0');

const Projects: React.FC<Props> = ({dispatch, state}) => {
  const backgroundColor = useDynamicValue(dynamicBackgroundColor);
  const titleColor = useDynamicValue(dynamicTitleColor);

  return (
    <Stack.Navigator initialRouteName="Index" mode="card">
      <Stack.Screen
        name="Index"
        options={{
          title: 'Projects',
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
        }}>
        {(props) => <Index {...props} dispatch={dispatch} projects={state} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Projects;
