import React, {useRef, useEffect} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {StackScreenProps} from '@react-navigation/stack';
import DropdownAlert from 'react-native-dropdownalert';

import Actions, {getProjects, clearGetError} from '@/actions/projects';
import {State as ProjectsState} from '@/reducers/projects';
import listSeparator from '@/components/atoms/listSeparator';
import Item from './project';
import {ProjectsParam} from '@/navigations/projects';
import {HomeParam} from '@/navigations/home';

type Props = StackScreenProps<ProjectsParam & HomeParam, 'Index'> & {
  projects: ProjectsState;
} & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const index: React.FC<Props> = ({dispatch, projects, navigation}) => {
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getProjects(navigation));
  }, [inputRef]);

  let dropdown = useRef<DropdownAlert | null>();

  useEffect(() => {
    if (projects.errors) {
      dropdown.current?.alertWithType(
        'error',
        'Error',
        projects.errors.toString(),
      );
      dispatch(clearGetError());
    }
  }, [projects.errors]);

  const onRefresh = () => {
    dispatch(getProjects(navigation));
  };

  const openLists = (params: {projectID: number; title: string}) => {
    return navigation.navigate('Lists', {
      screen: 'Index',
      params: {
        projectID: params.projectID,
        title: params.title,
      },
    });
  };

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <FlatList
        data={projects.projects}
        renderItem={({item}) => <Item open={openLists} project={item}></Item>}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={listSeparator}
        refreshControl={
          <RefreshControl refreshing={projects.loading} onRefresh={onRefresh} />
        }></FlatList>
      <DropdownAlert ref={(ref) => (dropdown.current = ref)} />
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
