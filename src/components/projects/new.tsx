import React from 'react';
import {View} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {StackScreenProps} from '@react-navigation/stack';

import {ProjectsParam} from '@/navigations/projects';

type Props = StackScreenProps<ProjectsParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, any>;
};

const New: React.FC<Props> = () => {
  const styles = useDynamicValue(dynamicStyles);
  return <View style={styles.container}></View>;
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default New;
