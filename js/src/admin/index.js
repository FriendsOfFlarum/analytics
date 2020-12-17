import AnalyticsSettingsPage from './components/AnalyticsSettingsPage';

app.initializers.add('fof-analytics', (app) => {
    app.extensionData.for('fof-analytics').registerPage(AnalyticsSettingsPage);
});
