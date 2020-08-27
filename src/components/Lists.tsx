import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {DynamicValue, useDynamicValue} from 'react-native-dynamic';

import {HomeParam} from '@/navigations/home';
import {ListsParam} from '@/navigations/lists';
import {State as ListsState} from '@/reducers/lists';
import Actions from '@/actions/projects/lists';
import Index from './lists/index';

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
    </ListsStack.Navigator>
  );
};

export default Lists;
