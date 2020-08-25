import {connect} from 'react-redux';

import mapStateToProps from './mapState';
import projects from '../components/Projects.tsx';

export default connect(mapStateToProps)(projects);
