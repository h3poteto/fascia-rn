import React, {useEffect} from 'react';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {View, Text, ScrollView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';

import {ProjectsParam} from '@/navigations/projects';
import Actions, {getTask} from '@/actions/projects/tasks/show';
import {Task} from '@/entities/task';

type Props = StackScreenProps<ProjectsParam, 'Task'> & {
  dispatch: ThunkDispatch<any, any, Actions>;
  task: Task | null;
};

const task: React.FC<Props> = ({route, dispatch, task}) => {
  const {projectID} = route.params;
  const {listID} = route.params;
  const {taskID} = route.params;

  useEffect(() => {
    dispatch(getTask(projectID, listID, taskID));
  }, [projectID, listID, taskID]);

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{task?.title}</Text>
        <Text style={styles.description}>{task?.description}</Text>
      </ScrollView>
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
    fontSize: 20,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
    fontWeight: 'bold',
  },
  description: {
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
  },
});

export default task;
