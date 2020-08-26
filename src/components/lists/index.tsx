import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {StackParam} from '@/navigations/stack';
import {RootStore} from '@/reducers';

type Props = StackScreenProps<StackParam, 'Lists'>;

const index: React.FC<Props> = ({route}) => {
  const {projectID} = route.params;
  return (
    <View>
      <Text>{projectID}</Text>
    </View>
  );
};

export default index;
