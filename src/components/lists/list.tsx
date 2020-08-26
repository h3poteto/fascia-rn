import React from 'react';
import {View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {List} from '@/entities/list';

type Props = {
  list: List;
};

const item: React.FC<Props> = ({list}) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{list.title}</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  item: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    marginTop: 4,
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: new DynamicValue('#000000', '#f0f0f0'),
  },
});

export default item;
