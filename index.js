/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
import { YaMap } from 'react-native-yamap';

YaMap.init('19b029d0-0e0b-4240-958b-6366e17e765d');


AppRegistry.registerComponent(appName, () => App);
