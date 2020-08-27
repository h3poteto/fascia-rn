import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, ScrollView} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {TasksParam} from '@/navigations/tasks';

type Props = StackScreenProps<TasksParam, 'Edit'>;

const edit: React.FC<Props> = () => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>edit</Text>
      </View>
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default edit;
