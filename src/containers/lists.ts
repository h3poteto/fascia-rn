import {connect} from 'react-redux';

import {RootStore} from '@/reducers';
import {State as ListsState} from '@/reducers/lists';
import lists from '@/components/Lists.tsx';

const mapStateToProps = (state: RootStore): {state: ListsState} => {
  return {
    state: state.lists,
  };
};

export default connect(mapStateToProps)(lists);
