import React, {useRef, useEffect} from 'react';
import {View, ScrollView, Text, TextInput, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {useForm, Controller} from 'react-hook-form';
import DropdownAlert from 'react-native-dropdownalert';

import {TasksParam} from '@/navigations/tasks';
import NewActions, {createTask} from '@/actions/projects/tasks/new';

type Props = StackScreenProps<TasksParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, NewActions>;
  error: Error | null;
};

type FormData = {
  title: string;
  description: string;
};

const New: React.FC<Props> = ({dispatch, navigation, route, error}) => {
  const {control, handleSubmit, errors} = useForm<FormData>();
  const {projectID, listID} = route.params;
  const onSubmit = handleSubmit(({title, description}) => {
    dispatch(
      createTask(navigation, projectID, listID, {
        title,
        description,
      }),
    );
  });

  let dropdown = useRef<DropdownAlert | null>();

  useEffect(() => {
    if (error) {
      dropdown.current?.alertWithType('error', 'Error', error.toString());
    }
  }, [error]);

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
              autoFocus={true}
            />
          )}
          name="title"
          rules={{required: true}}
          defaultValue=""
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
            />
          )}
          name="description"
          defaultValue=""
        />
      </ScrollView>
      <View style={styles.submit}>
        <Button title="Submit" color="#0069d9" onPress={onSubmit} />
      </View>
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
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
  },
  description: {
    borderWidth: 0,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
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

export default New;
