import AnalyticsSettingsModal from './components/AnalyticsSettingsModal';
import addAnalyticsPage from './addAnalyticsPage';

app.initializers.add('fof-analytics', app => {
    app.extensionSettings['fof-analytics'] = () => app.modal.show(new AnalyticsSettingsModal());
    addAnalyticsPage();
});
