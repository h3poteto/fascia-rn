import React, {useRef, useEffect} from 'react';
import {
  SectionList,
  View,
  TouchableOpacity,
  RefreshControl,
  ViewStyle,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/AntDesign';
import DropdownAlert from 'react-native-dropdownalert';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ActionButton from 'react-native-action-button';

import {ListsParam} from '@/navigations/lists';
import {HomeParam} from '@/navigations/home';
import Actions, {
  getLists,
  clearGetError,
  displayList,
  hideList,
} from '@/actions/projects/lists';
import {State as ListsState} from '@/reducers/lists';
import listSeparator from '@/components/atoms/listSeparator';
import sectionSeparator from '@/components/atoms/sectionSeparator';
import ListItem from './list';
import TaskItem from './task';
import {Task} from '@/entities/task';
import {List} from '@/entities/list';

type Props = StackScreenProps<ListsParam & HomeParam, 'Index'> & {
  lists: ListsState;
  dispatch: ThunkDispatch<any, any, Actions>;
};

const dynamicActionSheetContainerColor = new DynamicValue('#f0f0f0', '#202020');
const dynamicActionSheetTitleColor = new DynamicValue('#5a5a5a', '#f0f0f0');
const dynamicActionSheetSeparatorColor = new DynamicValue('#DED0DE', '#4E404E');

const index: React.FC<Props> = ({navigation, route, dispatch, lists}) => {
  const {projectID} = route.params;

  const {showActionSheetWithOptions} = useActionSheet();

  useEffect(() => {
    dispatch(getLists(navigation, projectID));
  }, [projectID]);

  let dropdown = useRef<DropdownAlert | null>();

  useEffect(() => {
    if (lists.errors) {
      dropdown.current?.alertWithType(
        'error',
        'Error',
        lists.errors.toString(),
      );
      dispatch(clearGetError());
    }
  }, [lists.errors]);

  const onRefresh = () => {
    dispatch(getLists(navigation, projectID));
  };

  const actionSheetContainerColor = useDynamicValue(
    dynamicActionSheetContainerColor,
  );
  const actionSheetTitleColor = useDynamicValue(dynamicActionSheetTitleColor);
  const actionSheetSeparatorColor = useDynamicValue(
    dynamicActionSheetSeparatorColor,
  );

  const openTaskActions = (selected: (list: List) => void) => {
    showActionSheetWithOptions(
      {
        title: 'Move the task under a list',
        message: 'Please choose a list to move the task to',
        options: lists.lists.map((l) => l.title).concat(['Cancel']),
        cancelButtonIndex: lists.lists.length,
        showSeparators: true,
        icons: lists.lists
          .map((l) => (
            <View
              style={{
                backgroundColor: `#${l.color}`,
                width: 24,
                height: 24,
                borderRadius: 20,
              }}></View>
          ))
          .concat([<View style={{width: 24, height: 24}}></View>]),
        textStyle: {color: '#0069d9', fontWeight: 'bold'},
        containerStyle: {backgroundColor: actionSheetContainerColor},
        titleTextStyle: {color: actionSheetTitleColor},
        messageTextStyle: {color: actionSheetTitleColor},
        separatorStyle: {
          backgroundColor: actionSheetSeparatorColor,
        } as ViewStyle,
      },
      (buttonIndex) => {
        // Cancel case
        if (buttonIndex >= lists.lists.length) {
          return;
        }
        selected(lists.lists[buttonIndex]);
      },
    );
  };

  const openTask = (params: {
    projectID: number;
    listID: number;
    taskID: number;
    title: string;
  }) => {
    return navigation.navigate('Tasks', {
      screen: 'Show',
      params: {
        projectID: params.projectID,
        listID: params.listID,
        taskID: params.taskID,
        title: params.title,
      },
    });
  };

  const newTask: Task = {
    id: -1,
    list_id: -1,
    project_id: -1,
    user_id: -1,
    issue_number: -1,
    title: 'new',
    description: '',
    html_url: '',
    pull_request: false,
  };

  const renderData = lists.lists.map((l) => {
    if (l.is_hidden) {
      return {
        list: l,
        data: [newTask],
      };
    }
    return {
      list: l,
      data: l.tasks.concat([newTask]),
    };
  });

  const openNewList = () => {
    navigation.navigate('Lists', {
      screen: 'New',
      params: {
        projectID: projectID,
      },
    });
  };

  const openNewTask = (list: List) => {
    navigation.navigate('Tasks', {
      screen: 'New',
      params: {
        projectID: list.project_id,
        listID: list.id,
      },
    });
  };

  const changeListVisible = (list: List) => {
    if (list.is_hidden) {
      dispatch(displayList(list.project_id, list.id));
    } else {
      dispatch(hideList(list.project_id, list.id));
    }
  };

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.container}>
      <SectionList
        sections={renderData}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={listSeparator}
        SectionSeparatorComponent={sectionSeparator}
        renderItem={({item, section}) => {
          if (item.id === -1) {
            return (
              <TouchableOpacity
                style={styles.new}
                onPress={() => openNewTask(section.list)}>
                <Icon name="plus" size={25} style={styles.plus} />
              </TouchableOpacity>
            );
          } else {
            return (
              <TaskItem
                task={item}
                list={section.list}
                open={openTask}
                openTaskActions={openTaskActions}
                dispatch={dispatch}
              />
            );
          }
        }}
        renderSectionHeader={({section: {list}}) => (
          <ListItem list={list} onPress={changeListVisible}></ListItem>
        )}
        refreshControl={
          <RefreshControl refreshing={lists.loading} onRefresh={onRefresh} />
        }></SectionList>
      <ActionButton
        buttonColor="#0069d9"
        onPress={() => {
          openNewList();
        }}
      />
      <DropdownAlert ref={(ref) => (dropdown.current = ref)} />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('#f0f0f0', '#000000'),
  },
  new: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: new DynamicValue('#ffffff', '#1a1a1a'),
  },
  plus: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    color: new DynamicValue('#000000', '#dcdcdc'),
  },
});

export default index;
