import {connect} from 'react-redux';

import {RootStore} from '@/reducers';
import {State as TasksState} from '@/reducers/tasks';
import tasks from '@/components/Tasks.tsx';

const mapStateToProps = (state: RootStore): {state: TasksState} => {
  return {
    state: state.tasks,
  };
};

export default connect(mapStateToProps)(tasks);
