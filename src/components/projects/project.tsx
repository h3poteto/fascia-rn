import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {Project} from '../../entities/project';

type Props = {
  project: Project;
};

const item: React.FC<Props> = ({project}) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.item}>
      <View style={styles.wrapper}>
        <View style={styles.image}></View>
        <Text style={styles.title}>{project.title}</Text>
      </View>
      <Image
        style={styles.icon}
        source={require('~assets/icons/60x60.png')}></Image>
    </View>
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
  image: {
    backgroundColor: '#17a2b8',
    width: 24,
    marginRight: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: new DynamicValue('#000000', '#f0f0f0'),
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    borderRadius: 4,
  },
});

export default item;
