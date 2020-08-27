import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicValue,
  useDynamicValue,
  DynamicStyleSheet,
} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/AntDesign';

import {HomeParam} from '@/navigations/home';
import {TasksParam} from '@/navigations/tasks';
import {State as TasksState} from '@/reducers/tasks';
import ShowActions from '@/actions/projects/tasks/show';
import EditActions from '@/actions/projects/tasks/edit';
import Show from './tasks/show';
import Edit from './tasks/edit';

type Props = StackScreenProps<HomeParam, 'Tasks'> & {
  state: TasksState;
} & {
  dispatch: ThunkDispatch<any, any, ShowActions & EditActions>;
};

const TasksStack = createStackNavigator<TasksParam>();

const dynamicBackgroundColor = new DynamicValue('#ffffff', '#000000');
const dynamicTitleColor = new DynamicValue('#0a0a0a', '#f0f0f0');

const Tasks: React.FC<Props> = ({navigation, dispatch, state}) => {
  const backgroundColor = useDynamicValue(dynamicBackgroundColor);
  const titleColor = useDynamicValue(dynamicTitleColor);
  const editTaskButtonStyles = useDynamicValue(editTaskButtonDynamicStyles);
  const headerStyles = useDynamicValue(headerDynamicStyles);

  const editTask = () => {
    return navigation.navigate('Tasks', {
      screen: 'Edit',
      params: {
        projectID: state.task?.project_id,
        listID: state.task?.list_id,
        taskID: state.task?.id,
        title: state.task?.title,
      },
    });
  };

  return (
    <TasksStack.Navigator initialRouteName="Show" mode="card">
      <TasksStack.Screen
        name="Show"
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {backgroundColor: backgroundColor},
          headerTintColor: titleColor,
          headerRight: () => (
            <TouchableOpacity
              style={editTaskButtonStyles.button}
              onPress={editTask}>
              <Icon name="edit" size={25} style={editTaskButtonStyles.icon} />
            </TouchableOpacity>
          ),
        })}>
        {(props) => <Show {...props} dispatch={dispatch} task={state.task} />}
      </TasksStack.Screen>
      <TasksStack.Screen
        name="Edit"
        options={{
          headerBackImage: () => (
            <Icon name="close" size={25} style={headerStyles.close} />
          ),
        }}>
        {(props) => <Edit {...props} dispatch={dispatch} task={state.task} />}
      </TasksStack.Screen>
    </TasksStack.Navigator>
  );
};

const editTaskButtonDynamicStyles = new DynamicStyleSheet({
  button: {
    marginRight: 12,
  },
  icon: {
    color: new DynamicValue('#0069d9', '#0069d9'),
  },
});

const headerDynamicStyles = new DynamicStyleSheet({
  close: {
    color: new DynamicValue('#0069d9', '#0069d9'),
  },
});

export default Tasks;
