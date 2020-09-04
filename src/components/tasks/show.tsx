import React, {useRef, useEffect} from 'react';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import DropdownAlert from 'react-native-dropdownalert';
import Markdown from 'react-native-markdown-renderer';

import {TasksParam} from '@/navigations/tasks';
import Actions, {getTask, clearGetError} from '@/actions/projects/tasks/show';
import {State as TasksState} from '@/reducers/tasks';

type Props = StackScreenProps<TasksParam, 'Show'> & {
  dispatch: ThunkDispatch<any, any, Actions>;
  tasks: TasksState;
};

const task: React.FC<Props> = ({route, dispatch, tasks, navigation}) => {
  const {projectID} = route.params;
  const {listID} = route.params;
  const {taskID} = route.params;

  useEffect(() => {
    dispatch(getTask(navigation, projectID, listID, taskID));
  }, [projectID, listID, taskID]);

  let dropdown = useRef<DropdownAlert | null>();

  useEffect(() => {
    if (tasks.errors) {
      dropdown.current?.alertWithType(
        'error',
        'Error',
        tasks.errors.toString(),
      );
      dispatch(clearGetError());
    }
  }, [tasks.errors]);

  const onRefresh = () => {
    dispatch(getTask(navigation, projectID, listID, taskID));
  };

  const styles = useDynamicValue(dynamicStyles);
  const markdownStyles = useDynamicValue(dynamicMarkdownStyles);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={tasks.loading} onRefresh={onRefresh} />
        }>
        <Text style={styles.title}>{tasks.task?.title}</Text>
        <View style={styles.description}>
          <Markdown style={markdownStyles}>
            {tasks.task?.description ? tasks.task.description : ''}
          </Markdown>
        </View>
      </ScrollView>
      <DropdownAlert ref={(ref) => (dropdown.current = ref)} />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
  title: {
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 20,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#1a1a1a'),
    fontWeight: 'bold',
  },
  description: {
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#1a1a1a'),
  },
});

const dynamicMarkdownStyles = new DynamicStyleSheet({
  text: {
    fontSize: 16,
    color: new DynamicValue('#000000', '#dcdcdc'),
  },
  listItem: {
    flex: 1,
    flexWrap: 'wrap',
    width: '100%',
    fontSize: 18,
    lineHeight: 20,
  },
  listOrdered: {
    width: '100%',
  },
  listOrderedText: {
    fontSize: 18,
    lineHeight: 20,
  },
  listOrderedItemIcon: {
    color: new DynamicValue('#000000', '#dcdcdc'),
    lineHeight: 42,
    paddingLeft: 4,
    paddingRight: 6,
  },
  listUnordered: {
    width: '100%',
  },
  listUnorderedItemText: {
    fontSize: 18,
    lineHeight: 20,
  },
  listUnorderedItemIcon: {
    color: new DynamicValue('#000000', '#dcdcdc'),
    lineHeight: 42,
    paddingLeft: 4,
    paddingRight: 6,
  },
});

export default task;
