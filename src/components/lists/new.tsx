import React, {useLayoutEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Platform,
  Button,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {useForm, Controller} from 'react-hook-form';
import {ThunkDispatch} from 'redux-thunk';

import {ListsParam} from '@/navigations/lists';

type Props = StackScreenProps<ListsParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, any>;
};

type CreateListParams = {
  title: string;
  color: string;
};

const New: React.FC<Props> = ({navigation}) => {
  const {control, handleSubmit, errors} = useForm<CreateListParams>();
  const onSubmit = handleSubmit(({title, color}) => {
    console.log(title, color);
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
