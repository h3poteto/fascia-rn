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
import {ListsParam} from '@/navigations/lists';
import {State as ListsState} from '@/reducers/lists';
import Actions from '@/actions/projects/lists';
import Index from './lists/index';
import New from './lists/new';

type Props = StackScreenProps<HomeParam, 'Lists'> & {
  state: ListsState;
} & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const ListsStack = createStackNavigator<ListsParam>();

const dynamicBackgroundColor = new DynamicValue('#ffffff', '#000000');
const dynamicTitleColor = new DynamicValue('#0a0a0a', '#f0f0f0');

const Lists: React.FC<Props> = ({state, dispatch}) => {
  const backgroundColor = useDynamicValue(dynamicBackgroundColor);
  const titleColor = useDynamicValue(dynamicTitleColor);

  const headerStyles = useDynamicValue(headerDynamicStyles);

  return (
    <ListsStack.Navigator initialRouteName="Index" mode="card">
      <ListsStack.Screen
        name="Index"
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
        })}>
        {(props) => <Index {...props} dispatch={dispatch} lists={state} />}
      </ListsStack.Screen>
      <ListsStack.Screen
        name="New"
        options={() => ({
          title: 'New',
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
          headerBackImage: () => (
            <Icon name="close" size={25} style={headerStyles.close} />
          ),
        })}>
        {(props) => <New {...props} dispatch={dispatch} />}
      </ListsStack.Screen>
    </ListsStack.Navigator>
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

export default Lists;
