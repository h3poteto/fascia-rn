import React from 'react';
import {View} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

type Props = {
  highlighted: boolean;
};

const sectionSeparator: React.FC<Props> = () => {
  const styles = useDynamicValue(dynamicStyles);
  return <View style={styles.separator} />;
};

const dynamicStyles = new DynamicStyleSheet({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: new DynamicValue('#DED0DE', '#4E404E'),
    marginLeft: 0,
  },
});

export default sectionSeparator;
