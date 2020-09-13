import React, {useLayoutEffect} from 'react';
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

import {ProjectsParam} from '@/navigations/projects';
import {CreateProjectParams} from '@/apiClient';
import Actions, {createProject} from '@/actions/projects/new';

type Props = StackScreenProps<ProjectsParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, Actions>;
};

const New: React.FC<Props> = ({navigation, dispatch}) => {
  const {control, handleSubmit, errors} = useForm<CreateProjectParams>();
  const onSubmit = handleSubmit(({title, description}) => {
    dispatch(
      createProject(navigation, {
        title,
        description,
      }),
    );
  });

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
      {Platform.OS != 'ios' && (
        <View style={styles.submit}>
          <Button title="Submit" color="#0069d9" onPress={onSubmit} />
        </View>
      )}
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

export default New;
