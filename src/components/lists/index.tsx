import React, {useEffect} from 'react';
import {SectionList, View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {ProjectsParam} from '@/navigations/projects';
import Actions, {getLists} from '@/actions/projects/lists';
import {State as ListsState} from '@/reducers/lists';
import listSeparator from '@/components/atoms/listSeparator';
import sectionSeparator from '@/components/atoms/sectionSeparator';
import ListItem from './list';
import TaskItem from './task';

type Props = StackScreenProps<ProjectsParam, 'Lists'> & {
  lists: ListsState;
  dispatch: ThunkDispatch<any, any, Actions>;
};

const index: React.FC<Props> = ({navigation, route, dispatch, lists}) => {
  const {projectID} = route.params;

  useEffect(() => {
    dispatch(getLists(projectID));
  }, [projectID]);

  const openTask = (params: {
    projectID: number;
    listID: number;
    taskID: number;
    title: string;
  }) => {
    return navigation.navigate('Task', {
      projectID: params.projectID,
      listID: params.listID,
      taskID: params.taskID,
      title: params.title,
    });
  };

  const renderData = lists.lists.map((l) => ({
    list: l,
    data: l.tasks,
  }));

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <SectionList
        sections={renderData}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={listSeparator}
        SectionSeparatorComponent={sectionSeparator}
        renderItem={({item, section}) => (
          <TaskItem task={item} list={section.list} open={openTask} />
        )}
        renderSectionHeader={({section: {list}}) => (
          <ListItem list={list}></ListItem>
        )}></SectionList>
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
