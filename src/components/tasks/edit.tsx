import React, {useRef, useEffect, useLayoutEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {ThunkDispatch} from 'redux-thunk';
import {useForm, Controller} from 'react-hook-form';
import DropdownAlert from 'react-native-dropdownalert';

import {TasksParam} from '@/navigations/tasks';
import ShowActions from '@/actions/projects/tasks/show';
import EditActions, {
  updateTask,
  clearUpdateError,
} from '@/actions/projects/tasks/edit';
import {Task} from '@/entities/task';

type Props = StackScreenProps<TasksParam, 'Edit'> & {
  task: Task | null;
  error: Error | null;
} & {
  dispatch: ThunkDispatch<any, any, ShowActions | EditActions>;
};

type FormData = {
  title: string;
  description: string;
};

const edit: React.FC<Props> = ({navigation, task, dispatch, error}) => {
  const {control, handleSubmit, errors} = useForm<FormData>();
  const onSubmit = handleSubmit(({title, description}) => {
    if (task) {
      dispatch(
        updateTask(navigation, task.project_id, task.list_id, task.id, {
          title,
          description,
        }),
      );
    }
  });

  let dropdown = useRef<DropdownAlert | null>();

  useEffect(() => {
    if (error) {
      dropdown.current?.alertWithType('error', 'Error', error.toString());
      dispatch(clearUpdateError());
    }
  }, [error]);

  if (Platform.OS === 'ios') {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button onPress={onSubmit} title="Save" />,
      });
    });
  }

  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.title}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{required: true}}
          defaultValue={task?.title}
        />
        {errors.title && <Text style={styles.error}>Title is required.</Text>}

        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              multiline
              style={styles.description}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              autoFocus={true}
            />
          )}
          name="description"
          defaultValue={task?.description}
        />
      </ScrollView>
      {Platform.OS != 'ios' && (
        <View style={styles.submit}>
          <Button title="Submit" color="#0069d9" onPress={onSubmit} />
        </View>
      )}
      <DropdownAlert ref={(ref) => (dropdown.current = ref)} />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
  scroll: {
    marginBottom: 48,
  },
  label: {
    color: new DynamicValue('#000000', '#dcdcdc'),
    fontSize: 18,
    marginTop: 12,
    marginLeft: 16,
  },
  title: {
    borderWidth: 0,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#202020'),
    marginTop: 8,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    fontSize: 18,
    lineHeight: 24,
    minHeight: 40,
  },
  description: {
    borderWidth: 0,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#202020'),
    marginTop: 8,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    fontSize: 18,
    lineHeight: 24,
  },
  error: {
    color: '#dc3545',
    marginLeft: 12,
  },
  submit: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    height: 36,
    bottom: 0,
  },
});

export default edit;
