import {connect} from 'react-redux';

import {RootStore} from '@/reducers';
import {State as ProjectsState} from '@/reducers/projects';
import projects from '@/components/Projects.tsx';

const mapStateToProps = (state: RootStore): {state: ProjectsState} => {
  return {
    state: state.projects,
  };
};

export default connect(mapStateToProps)(projects);
