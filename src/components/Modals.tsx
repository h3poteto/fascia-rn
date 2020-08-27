import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  DynamicValue,
  useDynamicValue,
  DynamicStyleSheet,
} from 'react-native-dynamic';

import {HomeParam} from '@/navigations/home';
import {ModalsParam} from '@/navigations/modals';
import EditTask from './tasks/edit';

type Props = StackScreenProps<HomeParam, 'Modals'>;

const ModalsStack = createStackNavigator<ModalsParam>();

const Modals: React.FC<Props> = () => {
  const modalStyles = useDynamicValue(dynamicStyles);
  return (
    <ModalsStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: true,
        headerBackImage: () => (
          <Icon name="close" size={25} style={modalStyles.close} />
        ),
      }}>
      <ModalsStack.Screen
        name="EditTask"
        component={EditTask}></ModalsStack.Screen>
    </ModalsStack.Navigator>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  close: {
    color: new DynamicValue('#0069d9', '#0069d9'),
  },
});

export default Modals;
