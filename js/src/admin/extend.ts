import Extend from 'flarum/common/extenders';
import AnalyticsSettingsPage from './components/AnalyticsSettingsPage';

export default [
  new Extend.Admin()
    .page(AnalyticsSettingsPage)
];
