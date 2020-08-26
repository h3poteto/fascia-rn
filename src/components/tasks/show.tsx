import React from 'react';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {ProjectsParam} from '@/navigations/projects';

type Props = StackScreenProps<ProjectsParam, 'Task'> & {
  dispatch: any;
};

const task: React.FC<Props> = () => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <Text style={{color: '#dcdcdc'}}>task</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default task;
