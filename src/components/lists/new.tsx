import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {useForm, Controller} from 'react-hook-form';
import {ThunkDispatch} from 'redux-thunk';
import Modal from 'react-native-modal';
import {TriangleColorPicker, fromHsv} from 'react-native-color-picker';
import DropdownAlert from 'react-native-dropdownalert';

import {ListsParam} from '@/navigations/lists';
import ColorButton from '@/components/atoms/colorButton';
import {CreateListParams} from '@/apiClient';
import Actions, {
  createList,
  clearCreateError,
} from '@/actions/projects/lists/new';

type Props = StackScreenProps<ListsParam, 'New'> & {
  dispatch: ThunkDispatch<any, any, Actions>;
  error: Error | null;
};

const New: React.FC<Props> = ({navigation, route, dispatch, error}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState<string>('#008ed4');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {control, handleSubmit, errors} = useForm<CreateListParams>();
  const onSubmit = handleSubmit(({title}) => {
    const {projectID} = route.params;
    dispatch(
      createList(navigation, projectID, {
        title,
        color,
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

        <Text style={styles.label}>Color</Text>
        <TouchableOpacity onPress={toggleModal}>
          <ColorButton color={color} />
        </TouchableOpacity>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <TriangleColorPicker
            defaultColor={color}
            onColorChange={(color) => setColor(fromHsv(color))}
            style={{flex: 1}}
            hideControls={true}
          />

          <Button title="Done" onPress={toggleModal} color={color} />
        </View>
      </Modal>
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
  modal: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
});

export default New;
