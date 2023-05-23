import {withNavigation} from './withNavigation';
import compose from 'compose-function';
import {withTheme} from './withTheme';

export default compose(withTheme, withNavigation);
