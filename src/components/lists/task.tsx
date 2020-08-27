import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {List} from '@/entities/list';
import {Task} from '@/entities/task';

type Props = {
  list: List;
  task: Task;
  open: Function;
};

const task: React.FC<Props> = ({list, task, open}) => {
  const onPress = () => {
    open({
      projectID: list.project_id,
      listID: list.id,
      taskID: task.id,
      title: task.title,
    });
  };
  const styles = useDynamicValue(dynamicStyles);
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View
        style={{
          backgroundColor: `#${list.color}`,
          width: 24,
          marginRight: 12,
          borderRadius: 20,
        }}></View>
      <Text style={styles.title}>{task.title}</Text>
    </TouchableOpacity>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  item: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: new DynamicValue('#000000', '#f0f0f0'),
  },
});

export default task;
