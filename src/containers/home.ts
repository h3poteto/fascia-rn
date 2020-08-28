import {connect} from 'react-redux';

import {RootStore} from '@/reducers';
import {State as HomeState} from '@/reducers/home';
import home from '@/components/Home.tsx';

const mapStateToProps = (state: RootStore): {state: HomeState} => {
  return {
    state: state.home,
  };
};

export default connect(mapStateToProps)(home);
