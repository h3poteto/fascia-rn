import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Platform,
  Button,
} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm, Controller} from 'react-hook-form';
import DropdownAlert from 'react-native-dropdownalert';
import RNPickerSelect from 'react-native-picker-select';

import {ProjectsParam} from '@/navigations/projects';
import {CreateProjectParams} from '@/apiClient';
import Actions, {createProject, clearCreateError} from '@/actions/projects/new';
import {Repository} from '@/entities/repository';

type Props = StackScreenProps<ProjectsParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, Actions>;
  error: Error | null;
  repositories: Array<Repository>;
};

const New: React.FC<Props> = ({navigation, dispatch, error, repositories}) => {
  const {control, handleSubmit, errors} = useForm<CreateProjectParams>();
  const onSubmit = handleSubmit(({title, description, repository_id}) => {
    dispatch(
      createProject(navigation, {
        title,
        description,
        repository_id,
      }),
    );
  });

  let dropdown = useRef<DropdownAlert | null>();

  useEffect(() => {
    if (error) {
      dropdown.current?.alertWithType('error', 'Error', error.toString());
      dispatch(clearCreateError());
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
  const picker = useDynamicValue(pickerSelectStyles);
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
        <Text style={styles.label}>Repository</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <RNPickerSelect
              onValueChange={(value) => onChange(value)}
              value={value}
              style={picker}
              onClose={onBlur}
              items={repositories.map(({id, full_name}) => ({
                label: full_name,
                value: id,
              }))}
            />
          )}
          name="repository_id"
          defaultValue=""
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

const pickerSelectStyles = new DynamicStyleSheet({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#202020'),
  },
  inputAndroid: {
    marginTop: 8,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    fontSize: 18,
    lineHeight: 24,
    color: new DynamicValue('#000000', '#dcdcdc'),
    backgroundColor: new DynamicValue('#ffffff', '#202020'),
  },
});

export default New;
