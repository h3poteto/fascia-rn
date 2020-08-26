import React from 'react';
import {View} from 'react-native';

const listSeparator: React.FC<{}> = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#CED0CE',
        marginLeft: 0,
      }}
    />
  );
};

export default listSeparator;
