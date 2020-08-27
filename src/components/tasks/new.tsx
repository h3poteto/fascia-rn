import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {TasksParam} from '@/navigations/tasks';

type Props = StackScreenProps<TasksParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, any>;
};

const New: React.FC<Props> = () => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>hoge</Text>
      </ScrollView>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default New;
