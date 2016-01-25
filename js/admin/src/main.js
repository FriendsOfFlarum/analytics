import { extend } from 'flarum/extend';
import app from 'flarum/app';

import AnalyticsSettingsModal from 'flagrow/analytics/components/AnalyticsSettingsModal';

app.initializers.add('flagrow-analytics', app => {
  app.extensionSettings['flagrow-analytics'] = () => app.modal.show(new AnalyticsSettingsModal());
});
