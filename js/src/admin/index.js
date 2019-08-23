import { extend } from 'flarum/extend';

import AnalyticsSettingsModal from './components/AnalyticsSettingsModal';
import addAnalyticsPage from './addAnalyticsPage';

app.initializers.add('giffgaff-analytics', app => {
    app.extensionSettings['giffgaff-analytics'] = () => app.modal.show(new AnalyticsSettingsModal());
    addAnalyticsPage();
});
