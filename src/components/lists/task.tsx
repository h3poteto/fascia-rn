import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/AntDesign';
import {ThunkDispatch} from 'redux-thunk';

import {List} from '@/entities/list';
import {Task} from '@/entities/task';
import Actions, {moveTask} from '@/actions/projects/lists';

type Props = {
  list: List;
  task: Task;
  open: (params: {
    projectID: number;
    listID: number;
    taskID: number;
    title: string;
  }) => void;
  openTaskActions: (selected: (list: List) => void) => void;
} & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const task: React.FC<Props> = ({
  list,
  task,
  open,
  openTaskActions,
  dispatch,
}) => {
  const onPress = () => {
    open({
      projectID: list.project_id,
      listID: list.id,
      taskID: task.id,
      title: task.title,
    });
  };

  const moveTaskTo = (list: List): void => {
    dispatch(moveTask(list.project_id, task.list_id, list.id, task.id, null));
  };

  const onLongPress = () => {
    openTaskActions(moveTaskTo);
  };

  const styles = useDynamicValue(dynamicStyles);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={styles.wrapper}>
        <View
          style={{
            backgroundColor: `#${list.color}`,
            width: 24,
            marginRight: 12,
            borderRadius: 20,
          }}></View>
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <Icon name="bars" size={25} style={styles.icon} />
    </TouchableOpacity>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  item: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    backgroundColor: new DynamicValue('#ffffff', '#1a1a1a'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: new DynamicValue('#000000', '#f0f0f0'),
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    color: new DynamicValue('#acacac', '#9a9a9a'),
  },
});

export default task;
