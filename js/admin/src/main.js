import { extend } from 'flarum/extend';
import app from 'flarum/app';

import AnalyticsSettingsModal from 'hyn/analytics/components/AnalyticsSettingsModal';

app.initializers.add('hyn-analytics', app => {
  app.extensionSettings['hyn-analytics'] = () => app.modal.show(new AnalyticsSettingsModal());
});
