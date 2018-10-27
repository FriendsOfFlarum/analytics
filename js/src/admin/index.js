import { extend } from 'flarum/extend';

import AnalyticsSettingsModal from './components/AnalyticsSettingsModal';
import addAnalyticsPage from './addAnalyticsPage'

app.initializers.add('flagrow-analytics', app => {
    app.extensionSettings['flagrow-analytics'] = () => app.modal.show(new AnalyticsSettingsModal());
    addAnalyticsPage();
});
