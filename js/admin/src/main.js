import { extend } from 'flarum/extend';
import app from 'flarum/app';

import AnalyticsSettingsModal from 'analytics/components/AnalyticsSettingsModal';

app.initializers.add('analytics', app => {
  app.extensionSettings['analytics'] = () => app.modal.show(new AnalyticsSettingsModal());
});
