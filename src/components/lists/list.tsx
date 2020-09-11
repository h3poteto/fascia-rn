import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {List} from '@/entities/list';

type Props = {
  list: List;
  onPress: (list: List) => void;
};

const item: React.FC<Props> = ({list, onPress}) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(list)}>
      <Text style={styles.title}>{list.title}</Text>
      <Icon
        name={list.is_hidden ? 'arrow-down' : 'arrow-up'}
        size={20}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  item: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    marginTop: 4,
    backgroundColor: new DynamicValue('#ffffff', '#1a1a1a'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: new DynamicValue('#000000', '#f0f0f0'),
  },
  icon: {
    flex: 0,
    marginRight: 12,
    color: new DynamicValue('#5c5c5c', '#9a9a9a'),
  },
});

export default item;
