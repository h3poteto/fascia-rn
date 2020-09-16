import React from 'react';
import {View} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

type Props = {
  color: string;
};

const colorButton: React.FC<Props> = ({color}) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <View style={{...styles.color, backgroundColor: color}}></View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#ffffff', '#202020'),
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 12,
  },
  color: {
    marginLeft: 20,
    marginRight: 20,
    height: 24,
    borderRadius: 8,
  },
});

export default colorButton;
