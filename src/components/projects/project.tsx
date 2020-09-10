import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {Project} from '@/entities/project';

type Props = {
  project: Project;
  open: (params: {projectID: number; title: string}) => void;
};

const item: React.FC<Props> = ({project, open}) => {
  const onPress = () => {
    open({projectID: project.id, title: project.title});
  };

  const styles = useDynamicValue(dynamicStyles);
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.image}></View>
        <Text numberOfLines={1} style={styles.title}>{project.title}</Text>
      </View>
      <Image
        style={styles.icon}
        source={require('~assets/icons/60x60.png')}></Image>
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
    flex: 1,
    minWidth: 0,
  },
  image: {
    flex: 0,
    backgroundColor: '#17a2b8',
    width: 24,
    marginRight: 12,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    paddingRight: 8,
    fontSize: 18,
    color: new DynamicValue('#000000', '#f0f0f0'),
  },
  icon: {
    flex: 0,
    width: 24,
    height: 24,
    marginRight: 12,
    borderRadius: 4,
  },
});

export default item;
