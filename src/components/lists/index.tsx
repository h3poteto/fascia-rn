import React, {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParam} from '@/navigations/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import Actions, {getLists} from '@/actions/projects/lists';
import {State as ListsState} from '@/reducers/lists';
import listSeparator from '@/components/atoms/listSeparator';
import Item from './list';

type Props = StackScreenProps<StackParam, 'Lists'> & {
  lists: ListsState;
  dispatch: ThunkDispatch<any, any, Actions>;
};

const index: React.FC<Props> = ({route, dispatch, lists}) => {
  const {projectID} = route.params;

  useEffect(() => {
    dispatch(getLists(projectID));
  }, [projectID]);

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <FlatList
        data={lists.lists}
        renderItem={({item}) => <Item list={item}></Item>}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={listSeparator}></FlatList>
      <Text>{projectID}</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default index;
