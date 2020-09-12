import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicValue,
  useDynamicValue,
  DynamicStyleSheet,
} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/AntDesign';

import {HomeParam} from '@/navigations/home';
import {ProjectsParam} from '@/navigations/projects';
import {State as ProjectsState} from '@/reducers/projects';
import Actions from '@/actions/projects';
import Index from './projects/index';
import New from './projects/new';

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
  const headerStyles = useDynamicValue(headerDynamicStyles);

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
      <Stack.Screen
        name="New"
        options={{
          title: 'New',
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
          headerBackImage: () => (
            <Icon name="close" size={25} style={headerStyles.close} />
          ),
        }}>
        {(props) => <New {...props} dispatch={dispatch} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const headerDynamicStyles = new DynamicStyleSheet({
  close: {
    color: new DynamicValue('#0069d9', '#0069d9'),
    marginLeft: Platform.select({
      ios: 12,
      android: 0,
    }),
  },
});

export default Projects;
