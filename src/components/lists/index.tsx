import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParam} from '@/navigations/stack';
import {ThunkDispatch} from 'redux-thunk';

import Actions, {getLists} from '@/actions/projects/lists';
import {State as ListsState} from '@/reducers/lists';

type Props = StackScreenProps<StackParam, 'Lists'> & {
  lists: ListsState;
  dispatch: ThunkDispatch<any, any, Actions>;
};

const index: React.FC<Props> = ({route, dispatch}) => {
  const {projectID} = route.params;

  useEffect(() => {
    dispatch(getLists(projectID));
  }, [projectID]);

  return (
    <View>
      <Text>{projectID}</Text>
    </View>
  );
};

export default index;
