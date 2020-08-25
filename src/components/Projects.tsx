import React, {useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ThunkDispatch} from 'redux-thunk';

import {DrawerParam} from './navigations/drawer';
import {RootStore} from '../reducers';
import Actions, {getProjects} from '../actions/projects';

type Props = DrawerScreenProps<DrawerParam, 'Projects'> &
  RootStore & {
    dispatch: ThunkDispatch<any, any, Actions>;
  };

const Projects: React.FC<Props> = ({dispatch, projects}) => {
  const inputRef = useRef();
  useEffect(() => {
    dispatch(getProjects());
    console.log(projects.projects);
  }, [inputRef]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Projects;
