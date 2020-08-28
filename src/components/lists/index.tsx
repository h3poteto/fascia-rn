import React, {useRef, useEffect} from 'react';
import {
  SectionList,
  View,
  TouchableOpacity,
  RefreshControl,
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

import {ListsParam} from '@/navigations/lists';
import {HomeParam} from '@/navigations/home';
import Actions, {getLists, clearGetError} from '@/actions/projects/lists';
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

const index: React.FC<Props> = ({navigation, route, dispatch, lists}) => {
  const {projectID} = route.params;

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

  const renderData = lists.lists.map((l) => ({
    list: l,
    data: l.tasks.concat([newTask]),
  }));

  const openNew = (list: List) => {
    navigation.navigate('Tasks', {
      screen: 'New',
      params: {
        projectID: list.project_id,
        listID: list.id,
      },
    });
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
                onPress={() => openNew(section.list)}>
                <Icon name="plus" size={25} style={styles.plus} />
              </TouchableOpacity>
            );
          } else {
            return <TaskItem task={item} list={section.list} open={openTask} />;
          }
        }}
        renderSectionHeader={({section: {list}}) => (
          <ListItem list={list}></ListItem>
        )}
        refreshControl={
          <RefreshControl refreshing={lists.loading} onRefresh={onRefresh} />
        }></SectionList>
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
    backgroundColor: new DynamicValue('#ffffff', '#101010'),
  },
  plus: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
  },
});

export default index;
