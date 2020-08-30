import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/AntDesign';

import {List} from '@/entities/list';
import {Task} from '@/entities/task';

type Props = {
  list: List;
  task: Task;
  open: Function;
  openTaskActions: Function;
};

const task: React.FC<Props> = ({list, task, open, openTaskActions}) => {
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
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      onLongPress={() => openTaskActions()}>
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
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
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
    color: new DynamicValue('#acacac', '#2a2a2a'),
  },
});

export default task;
