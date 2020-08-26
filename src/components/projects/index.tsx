import React, {useRef, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {StackScreenProps} from '@react-navigation/stack';

import Actions, {getProjects} from '@/actions/projects';
import {State as ProjectsState} from '@/reducers/projects';
import listSeparator from '@/components/atoms/listSeparator';
import Item from './project';
import {StackParam} from '@/navigations/stack';

type Props = StackScreenProps<StackParam, 'Index'> & {
  projects: ProjectsState;
} & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const index: React.FC<Props> = ({dispatch, projects, navigation}) => {
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getProjects());
    console.log(projects.projects);
  }, [inputRef]);

  const openLists = (params: {projectID: number; title: string}) => {
    return navigation.navigate('Lists', {
      projectID: params.projectID,
      title: params.title,
    });
  };

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <FlatList
        data={projects.projects}
        renderItem={({item}) => <Item open={openLists} project={item}></Item>}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={listSeparator}></FlatList>
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
